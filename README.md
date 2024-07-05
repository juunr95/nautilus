# Nautilus

Nautilus is an easy and reliable middleware to handle authentication for Express.JS applications.

## Features

- Simplifies authentication in Express.JS
- Lightweight and easy to integrate

## Installation

To install Nautilus, use npm:

```bash
npm install nautilus-auth
```

## Usage

To use Nautilus in your Express application, import and configure it as middleware:

```javascript
const express = require('express');
const nautilus = require('nautilus-auth');

const app = express();

app.use(nautilus({
    username: 'your-username',
    password: 'your-password',
}));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

## Configuration

Nautilus can be easly configured by setting and object with:

- `username`: Your username
- `password`: Your password

## Contributing

We welcome contributions! Please fork the repository and submit pull requests.

## License

This project is licensed under the GPL-2.0 License.

---

Feel free to customize this template to better fit your project's specifics.