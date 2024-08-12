require('ts-node/register'); 

const common = [
  './features/reservation.feature', 
  '--import ../dist/src/features/stepDefinitions/reservationStepsDefs.js', 
  '--format progress-bar', // Output format
  `--format-options '{"snippetInterface": "synchronous"}'` 
].join(' ');

module.exports = {
  default: common
};

