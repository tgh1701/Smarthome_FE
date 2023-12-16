import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const CustomizedMenus = ({ selectedComponent, handleMenuClose }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (componentName) => {
    handleMenuClose(componentName);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          color: "black",
          backgroundColor: "white",
          borderRadius: "10px",
          marginBottom: "10px",
          width: "120px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          fontWeight: "600",
          fontSize: "15px",
        }}
      >
        Charts <KeyboardArrowDownIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(selectedComponent)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleClose("ChartTemp")} disableRipple>
          Temperature and Humidity
        </MenuItem>
        <MenuItem onClick={() => handleClose("ChartGas")} disableRipple>
          Gas
        </MenuItem>
        <MenuItem onClick={() => handleClose("ChartSoil")} disableRipple>
          Soil Moisture
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CustomizedMenus;
