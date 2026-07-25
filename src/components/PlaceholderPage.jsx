import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function PlaceholderPage({
  title,
  description,
  items = [],
}) {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>

        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </Box>

      <Stack spacing={2}>
        {items.map((item, index) => (
          <Card key={`${item.title}-${index}`} variant="outlined">
            <CardContent>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                spacing={2}
              >
                <Box>
                  <Typography variant="h6">
                    {item.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </Box>

                {item.status && (
                  <Chip
                    label={item.status}
                    color={item.color || 'default'}
                    size="small"
                  />
                )}
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}