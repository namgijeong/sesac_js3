const path = require('path');

const showUsersController = (req, res) => {
  console.log('루트 파일 주소는', __dirname);
  res.sendFile(path.join(__dirname, '../../public/html/users', 'users.html'));
};

const showUserController = (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/html/users', 'user_detail.html'));
}

const showKioskController = (req, res) => {
  console.log('루트 파일 주소는', __dirname);
  res.sendFile(path.join(__dirname, '../../public/html/kiosk', 'user_login.html'));
}

const kioskUserRegisterController = (req, res) => {
  console.log('루트 파일 주소는', __dirname);
  res.sendFile(path.join(__dirname, '../../public/html/kiosk', 'store_list.html'));
}

module.exports = {
    showUsersController,
    showUserController,
    showKioskController,
    kioskUserRegisterController
}