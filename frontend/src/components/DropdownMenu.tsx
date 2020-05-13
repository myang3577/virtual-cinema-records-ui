import React, { useEffect } from "react";
import List from "@material-ui/core/List";
import {
  ListItem,
  ListItemText,
  Popper,
  ClickAwayListener,
  Paper,
} from "@material-ui/core";
import CheckBoxLabels from "./CheckBoxLabels";

interface MenuProps {
  handlerFunction: (event: React.ChangeEvent<HTMLInputElement>) => any;
  genreToDisplay: { [key: string]: boolean };
}

export default function SimpleListMenu(props: MenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [genreString, setGenreString] = React.useState("");
  const [genreSelectOpen, setGenreSelectOpen] = React.useState<boolean>(false);

  useEffect(() => {
    let newGenreString = "";
    Object.keys(props.genreToDisplay).forEach((keyName: string) => {
      if (props.genreToDisplay[keyName]) {
        newGenreString += keyName + ", ";
      }
    });

    setGenreString(newGenreString.substring(0, newGenreString.length - 2));
  }, [props.genreToDisplay]);

  return (
    <ClickAwayListener
      onClickAway={() => {
        console.log("clicked away");
        setGenreSelectOpen(false);
      }}
    >
      <Paper>
        <List component="nav">
          <ListItem
            button
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              setAnchorEl(event.currentTarget);
              setGenreSelectOpen(!genreSelectOpen);
            }}
          >
            <ListItemText
              primary="Selected Genres"
              secondary={
                genreString
              } /*"Now Playing, Popular" secondary="Now Playing, Popular"*/
            />
          </ListItem>
        </List>

        <Popper
          open={genreSelectOpen}
          anchorEl={anchorEl}
          placement={"bottom-start"}
        >
          <CheckBoxLabels
            handlerFunction={props.handlerFunction}
            genreToDisplay={props.genreToDisplay}
          />
        </Popper>
        {/* <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          disableScrollLock
        >
          <MenuItem
            disableRipple
            disableTouchRipple
            style={{ backgroundColor: "transparent" }}
          >
            <CheckBoxLabels
              handlerFunction={props.handlerFunction}
              genreToDisplay={props.genreToDisplay}
            />
          </MenuItem>
        </Menu> */}
      </Paper>
    </ClickAwayListener>
  );
}
