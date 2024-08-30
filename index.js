import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

// middleware para parsear el body de las peticiones
app.use(bodyParser.json());
// middleware para habilitar CORS
app.use(cors());

const readData = () => {
    try {
        const data = fs.readFileSync('./db.json');
        return JSON.parse(data);
    } catch (err) {
        console.log(err);
        return [];
    }
}

const writeData = (data) => {
    try {
        fs.writeFileSync('./db.json', JSON.stringify(data));
    } catch (err) {
        console.log(err);
    }
}

readData();

app.get('/', (req, res) => {
    res.send('This is my Api REST for app foodelivery! 🚀');
});

// endpoints para platos
app.get('/platos', (req, res) => {
    const data = readData();
    res.send(data.platos);
});

app.get('/platos/:id', (req, res) => {
    const data = readData();
    const plato = data.platos.find((plato) => plato.id === parseInt(req.params.id));
    res.json(plato);
});

app.post('/platos', (req, res) => {
    const data = readData();
    const plato = req.body;
    const newPlato = {
        id: data.platos.length + 1,
        ...plato
    };
    data.platos.push(newPlato);
    writeData(data);
    res.json(newPlato);
});

app.put('/platos/:id', (req, res) => {
    const data = readData();
    const plato = req.body;
    const platoIndex = data.platos.findIndex((plato) => plato.id === parseInt(req.params.id));
    data.platos[platoIndex] = {
        id: parseInt(req.params.id),
        ...plato
    };
    writeData(data);
    res.json({ message: 'Plato actualizado 😉' });
});

app.delete('/platos/:id', (req, res) => {
    const data = readData();
    const platoIndex = data.platos.findIndex((plato) => plato.id === parseInt(req.params.id));
    data.platos.splice(platoIndex, 1);
    writeData(data);
    res.json({ message: 'Plato eliminado 😢' });
});

// endpoints para restaurants
app.get('/restaurants', (req, res) => {
    const data = readData();
    res.send(data.restaurants);
});

app.get('/restaurants/:id', (req, res) => {
    const data = readData();
    const restaurant = data.restaurants.find((restaurant) => restaurant.id === parseInt(req.params.id));
    res.json(restaurant);
});

app.post('/restaurants', (req, res) => {
    const data = readData();
    const restaurant = req.body;
    const newRestaurant = {
        id: data.restaurants.length + 1,
        ...restaurant
    };
    data.restaurants.push(newRestaurant);
    writeData(data);
    res.json(newRestaurant);
});

app.put('/restaurants/:id', (req, res) => {
    const data = readData();
    const restaurant = req.body;
    const restaurantIndex = data.restaurants.findIndex((restaurant) => restaurant.id === parseInt(req.params.id));
    data.restaurants[restaurantIndex] = {
        id: parseInt(req.params.id),
        ...restaurant
    };
    writeData(data);
    res.json({ message: 'Restaurant actualizado 😉' });
});

app.delete('/restaurants/:id', (req, res) => {
    const data = readData();
    const restaurantIndex = data.restaurants.findIndex((restaurant) => restaurant.id === parseInt(req.params.id));
    data.restaurants.splice(restaurantIndex, 1);
    writeData(data);
    res.json({ message: 'Restaurant eliminado 😢' });
});

// endpoints para users
app.get('/users', (req, res) => {
    const data = readData();
    res.send(data.users);
});

app.get('/users/:id', (req, res) => {
    const data = readData();
    const user = data.users.find((user) => user.id === parseInt(req.params.id));
    res.json(user);
});

app.post('/users', (req, res) => {
    const data = readData();
    const user = req.body;
    const newUser = {
        id: data.users.length + 1,
        ...user
    };
    data.users.push(newUser);
    writeData(data);
    res.json(newUser);
});

app.put('/users/:id', (req, res) => {
    const data = readData();
    const user = req.body;
    const userIndex = data.users.findIndex((user) => user.id === parseInt(req.params.id));
    data.users[userIndex] = {
        id: parseInt(req.params.id),
        ...user
    };
    writeData(data);
    res.json({ message: 'Usuario actualizado 😉' });
});

app.delete('/users/:id', (req, res) => {
    const data = readData();
    const userIndex = data.users.findIndex((user) => user.id === parseInt(req.params.id));
    data.users.splice(userIndex, 1);
    writeData(data);
    res.json({ message: 'Usuario eliminado 😢' });
});

app.listen(3004, () => {
    console.log('Server is running on port 3004');
});