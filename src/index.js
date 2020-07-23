import 'bootstrap'
import './style.scss';
import { header } from './components/header/header-component';
import {$headerContainer } from './utils/const';
import routes from './routes';

window.onload = () => {
    header.render($headerContainer);

    routes.goTo('home');
};