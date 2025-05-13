"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const React = require("react");
const Container_1 = require("@mui/material/Container");
const Typography_1 = require("@mui/material/Typography");
const Box_1 = require("@mui/material/Box");
const Link_1 = require("@mui/material/Link");
const ProTip_1 = require("./ProTip");
function Copyright() {
    return (<Typography_1.default variant="body2" align="center" sx={{
            color: 'text.secondary',
        }}>
      {'Copyright © '}
      <Link_1.default color="inherit" href="https://mui.com/">
        Your Website
      </Link_1.default>{' '}
      {new Date().getFullYear()}.
    </Typography_1.default>);
}
function App() {
    return (<Container_1.default maxWidth="sm">
      <Box_1.default sx={{ my: 4 }}>
        <Typography_1.default variant="h4" component="h1" sx={{ mb: 2 }}>
          Material UI Vite example in TypeScript
        </Typography_1.default>
        <ProTip_1.default />
        <Copyright />
      </Box_1.default>
    </Container_1.default>);
}
//# sourceMappingURL=App.js.map