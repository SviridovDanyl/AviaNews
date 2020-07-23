import './cont-style.css';
import template from './cont-template.html';
import { view } from '../../core/view';

export const cont= view({
    template
});

cont.showComponents = () => {
    const $cont = $('#cont');
    
    cont.render($cont);
};