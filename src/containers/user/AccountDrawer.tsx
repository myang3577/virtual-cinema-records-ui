import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  withStyles,
} from "@material-ui/core";
import BlockIcon from "@material-ui/icons/Block";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../../actions/loginActions";
import {
  AccountModalContent,
  openAccountModal,
  openSnackBar,
  setAccountModalContent,
  SnackBarActionType,
  toggleAccountDrawer,
} from "../../actions/uiActions";
import VCRSmallLogo from "../../images/VCRIconOnly.png";
import { GlobalState } from "../../reducers/rootReducer";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  popper: {
    zIndex: 2000,
  },
});

interface AccountDrawerProps {
  onBlacklistClick: () => any;
}

function AccountDrawer(props: AccountDrawerProps) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const drawerOpen: any = useSelector<GlobalState>(
    (state) => state.uiData.accountDrawerOpen
  );

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<any>(null);

  useEffect(() => {
    dispatch(toggleAccountDrawer(drawerOpen));
  }, [dispatch, drawerOpen]);

  const toggleDrawer = (anchor: any, open: boolean) => (event: {
    type: string;
    key: string;
  }) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    dispatch(toggleAccountDrawer(open));
  };

  const onDrawerOptionClick = (index: any, event: any) => {
    if (index === 0) {
      if (isLoggedIn) {
        dispatch(setAccountModalContent(AccountModalContent.CHANGE_PASSWORD));
      } else {
        dispatch(setAccountModalContent(AccountModalContent.LOGIN));
      }
    } else if (index === 1) {
      if (isLoggedIn) {
        setMenuAnchorEl(event.currentTarget);
        handleLogoutClick(event);
        return;
      } else {
        dispatch(setAccountModalContent(AccountModalContent.REGISTER));
      }
    }

    if (index === 0 || index === 1) dispatch(openAccountModal());

    dispatch(toggleAccountDrawer(false));
  };

  const onBlacklistOptionClick = () => {
    props.onBlacklistClick();
    dispatch(toggleAccountDrawer(false));
  };

  var buttonTextOptions: string[][] = [
    ["Login", "Register"],
    ["Change Password", "Logout", "Blacklist"],
  ];

  var buttonIconOptions: any[][] = [
    [<PersonIcon />, <PersonAddIcon />],
    [<VpnKeyIcon />, <ExitToAppIcon />, <BlockIcon />],
  ];

  const setButtonOptions = (isLoggedIn: boolean) => {
    if (isLoggedIn) {
      return [buttonTextOptions[1], buttonIconOptions[1]];
    } else {
      return [buttonTextOptions[0], buttonIconOptions[0]];
    }
  };

  const isLoggedIn: any = useSelector<GlobalState>(
    (state) => state.loginData.isLoggedIn
  );

  useEffect(() => {
    setButtonOptions(isLoggedIn); // eslint-disable-next-line
  }, [isLoggedIn]);

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      "&:focus": {
        backgroundColor: theme.palette.primary.main,
        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

  const list = (anchor: string) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={(e) => {
        toggleDrawer(anchor, false);
      }}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Menu
        id="simple-menu"
        anchorEl={menuAnchorEl}
        keepMounted
        open={Boolean(menuAnchorEl)}
        onClose={() => setMenuAnchorEl(null)}
      >
        <StyledMenuItem onClick={handleLogoutSubmit}>
          Confirm Logout
        </StyledMenuItem>
      </Menu>
      <List>
        {setButtonOptions(isLoggedIn)[0].map((text, index) => {
          if (index === 2)
            return (
              <ListItem
                button
                key={index}
                onClick={onBlacklistOptionClick}
                component={Link}
                to={"/blacklist"}
              >
                <ListItemIcon>
                  {setButtonOptions(isLoggedIn)[1][index]}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            );
          else
            return (
              <ListItem
                button
                key={index}
                onClick={(e) => onDrawerOptionClick(index, e)}
              >
                <ListItemIcon>
                  {setButtonOptions(isLoggedIn)[1][index]}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            );
        })}
      </List>
      <Divider />
      <div id="account-drawer-pic">
        <img src={VCRSmallLogo} height="70px" alt="VCR logo" />
      </div>

      <div className="tmdb-attribution">
        This product uses the TMDb API but is not endorsed or certified by TMDb.
        <div className="divider"></div>
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={
              "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            }
            height="25px"
            alt="TMDb logo"
          />
        </a>
      </div>
    </div>
  );

  const handleLogoutSubmit = () => {
    dispatch(logout());
    dispatch(setAccountModalContent(AccountModalContent.LOGIN));
    dispatch(toggleAccountDrawer(false));
    dispatch(openSnackBar("Logged out", SnackBarActionType.LOGIN));
    setMenuOpen(false);
    setMenuAnchorEl(null);
  };

  const handleLogoutClick = (event: any) => {
    setMenuOpen(menuOpen ? false : true);
  };

  return (
    <div>
      {["right"].map((anchor: any) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(anchor, false)}
            variant="temporary"
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default AccountDrawer;
