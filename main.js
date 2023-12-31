const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const recipeRoutes= require('./routes/recipeCRUD')
const settingRoutes= require('./routes/settingsCRUD')



const app = express();
const PORT = process.env.PORT || 3005;
mongoose.connect('mongodb+srv://akhilabraham:akhil5470@clustershoppy.z1xw4z0.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use('/api/recipes', recipeRoutes);
app.use('/api/settings', settingRoutes);





app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });