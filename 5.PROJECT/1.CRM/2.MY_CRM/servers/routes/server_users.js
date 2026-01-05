const express = require('express');

const { showUsersController, showUserController, showKioskController, kioskUserRegisterController } = require('../controller/user_controller');
const { apiUsersController, apiUser, apiUsersPasswordReset, apiUserLoginCheck, apiUserOrders, apiUserStoresTop5, apiUserItemsTop5 } = require('../controller/user_api_controller');

// express.Router()는 라우트들을 묶기 위한 독립적인 라우팅 객체
// 즉,
// app처럼 get / post / put / delete를 가질 수 있고
// 근데 서버를 띄우는 역할은 안 함

const router = express.Router();

/******************
 * 사용자 요청 페이지 전달
 ******************/
router.get('/', showUsersController);

router.get('/users/:id', showUserController);

//키오스크 화면 보여주기
router.get('/kiosk', showKioskController);

//로그인 성공시 store list 페이지로 이동
router.get('/kiosk/user/register', kioskUserRegisterController);

/******************
 * 백엔드 API 요청
 ******************/
router.get('/api/users', apiUsersController);

router.get('/api/users/:id', apiUser);

//이미 등록된 사용자 비번들 초기화 =>일시적
router.get('/api/users/password/reset', apiUsersPasswordReset);

//로그인 검증
router.post('/api/users/login/check', apiUserLoginCheck);

router.get('/api/users_orders/:id', apiUserOrders);

router.get('/api/users_stores_top5/:id', apiUserStoresTop5);

router.get('/api/users_items_top5/:id', apiUserItemsTop5);

module.exports = router;
