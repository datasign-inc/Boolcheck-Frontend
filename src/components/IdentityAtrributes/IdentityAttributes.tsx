import { Box, Divider, List, ListItemText, Typography } from "@mui/material";

export interface IdentityAttribute {
  title: string;
  value: string;
}

export interface IdentityAttributes {
  attributes: IdentityAttribute[];
}

const doNotDisplay = ["portrait"];

export const IdentityAttributes = (props: IdentityAttributes) => {
  const filteredAttributes = props.attributes.filter(
    (attribute) => !doNotDisplay.includes(attribute.title)
  );

  return (
    <Box>
      <List disablePadding>
        {filteredAttributes.map((attribute, index) => {
          const title = attribute.title;
          const value = attribute.value;
          return (
            <Box key={index}>
              <Box ml={1}>
                <ListItemText>
                  <Typography variant="body2" color="textSecondary">
                    {title}
                  </Typography>
                  <Typography variant="subtitle1" color="textPrimary">
                    {value}
                  </Typography>
                </ListItemText>
              </Box>
              <Divider component="li" />
            </Box>
          );
        })}
      </List>
    </Box>
  );
};
