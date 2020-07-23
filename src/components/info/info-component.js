import './info-style.css';
import template from './info-template.html';
import { view } from '../../core/view';

export const info = view({
    template
});

info.showComponents = () => {
    const $info = $('#info');
    
    info.render($info);
};