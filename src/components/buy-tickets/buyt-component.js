import './buy-tickets-style.css';
import template from './buy-tickets-template.html';
import { view } from '../../core/view';

export const buyt = view({
    template
});

buyt.showComponents = () => {
    const $buyt = $('#buy-t');
    
    buyt.render($buyt);
};