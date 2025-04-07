import { Box, Button, TextField, Typography } from "@mui/material"

const MainChat = () => {
    return(
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {/* <Box sx={{ p: 2, borderBottom: '1px solid #ccc', backgroundColor: '#ededed' }}>
            <Typography variant="h6">Chat with Test1</Typography>
          </Box> */}

          <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto' }}>
            <Typography><strong>Test1:</strong> Hey there!</Typography>
            <Typography><strong>You:</strong> Hi Test1!</Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 1,
              p: 2,
              borderTop: '1px solid #ccc',
              backgroundColor: '#fafafa',
            }}
          >
            <TextField fullWidth placeholder="Type a message" size="small" />
            <Button variant="contained">Send</Button>
          </Box>
        </Box>  
    )
}

export default MainChat;