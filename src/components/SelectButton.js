import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles({
    selectButton: {
      border: "1px solid white",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "white" : "rgba(0,0,0,0.2)",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "rgba(255,255,255,0.9)",
        color: "black",
      },
      width: "22%",
    },
  });

  const classes = useStyles();

  return (
    <span className={classes.selectButton} onClick={onClick}>
      {children}
    </span>
  );
};

export default SelectButton;
