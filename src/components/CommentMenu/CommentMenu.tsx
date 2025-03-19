import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Divider } from "@mui/material";
import { DeleteDialog } from "../DeleteDialog/DeleteDialog.tsx";

const ITEM_HEIGHT = 48;

export interface CommentMenuProps {
  deleteHandler: () => void;
}

export const CommentMenu = (props: CommentMenuProps) => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ height: 48, padding: 0 }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          },
        }}
      >
        <MenuItem
          key={"DeleteComment"}
          onClick={() => {
            handleCloseMenu();
            setOpenDialog(true);
          }}
        >
          {t("DeleteComment")}
        </MenuItem>
        <Divider />
        <MenuItem key={"Cancel"} onClick={handleCloseMenu}>
          {t("Cancel")}
        </MenuItem>
      </Menu>
      {openDialog && (
        <DeleteDialog
          deleteAction={() => {
            props.deleteHandler();
          }}
          cancelAction={() => {
            setOpenDialog(false);
          }}
        />
      )}
    </>
  );
};
