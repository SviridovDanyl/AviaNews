import { error, $mainContainer } from '../utils/const';
import { home } from '../components/home/home-component';
import { Planes } from '../components/planes/planes-component';
import { buyt } from '../components/buy-tickets/buyt-component';
import { info } from '../components/info/info-component';
import { cont } from '../components/contact/cont-component';

/*
    @type {Object} - routes component
    @result - handle section changes
*/
export default {
    routes: {
        error,
        home,
        buyt,
        info,
        cont 
    },

    getComponent(route) {
        const component = this.routes[route];
        if (component) {
            return component;
        }

        return Planes({ model: { plane: route } });
    },

    /*
        @params {string} - route name of component to render
        @result - change main section.
    */
    goTo(route) {
        try {
            const component = this.getComponent(route);
            if (this.currentRout) {
                this.currentRout.$el.detach();
                this.currentRout.$el = null;
            }
            component.render($mainContainer);
            this.currentRout = component;
        } catch (error) {
            alert('routing error');
            console.error(error);
        }
    }
}