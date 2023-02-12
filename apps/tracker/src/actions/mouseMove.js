import { sendTrackData, throttle } from '../helpers';

// Probably we need it less than 200ms
// for better quality of "Visitor Actions Player"
const MOUSE_MOVE_THROTTLE_TIME = 100;

const ACTION_SEND_INTERVAL = 3000;

const eventBuffer = {
  data: [],
  latestSend: Date.now(),
};

const mouseMoveHandler = (userData) => {
  function handleEvent(event) {
    const timestamp = Date.now();
    const record = {
      x: event.clientX,
      y: event.clientY,
      timestamp,
    };

    eventBuffer.data.push(record);

    if (timestamp - eventBuffer.latestSend > ACTION_SEND_INTERVAL) {
      const manyRecords = {
        type: 'mouseMove',
        payload: {
          batch: eventBuffer.data,
        },
      };
      eventBuffer.data = [];
      eventBuffer.latestSend = Date.now();

      sendTrackData(userData, 'action', manyRecords);
    }
  }

  window.addEventListener('mousemove', throttle(handleEvent, MOUSE_MOVE_THROTTLE_TIME));
};

export default mouseMoveHandler;
