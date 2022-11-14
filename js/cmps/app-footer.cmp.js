import { eventBus } from "../services/event-bus.service.js"

export default {
    template: `
        <footer class="app-footer">
            <p>Coffeerights &copy; 2022</p>
        </footer>
    `,
        created(){
            eventBus.on('test-event', payload => console.log(payload))
            // eventBus.on('test-event',  console.log('payload'))
        }
}