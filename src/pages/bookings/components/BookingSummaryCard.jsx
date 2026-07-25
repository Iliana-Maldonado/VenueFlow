import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function BookingSummaryCard({
  icon,
  title,
  value,
}) {
  return (
    <Card
      variant="outlined"
      sx={{
        flex: 1,
        minWidth: 150,
      }}
    >
      <CardContent
        sx={{
          '&:last-child': {
            pb: 2,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: 'primary.main',
          }}
        >
          {icon}

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {title}
          </Typography>
        </Box>

        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ mt: 1 }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}