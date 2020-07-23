import './header-style.scss';
import template from './header-template.html';
import { view } from '../../core/view';
import routes from '../../routes/index';


const events = [
    { event: 'click', selector: 'a.nav-link', func: 'navigateTo' }
];

export const header = view({
    template,
    events,
    navigateTo(e) {
        e.preventDefault();
        const currentTarget = $(e.currentTarget);
        routes.goTo(currentTarget.attr('data-route'));
    }
});