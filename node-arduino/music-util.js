
var tau = 2 * Math.PI;

var musicUtil = {

  /**
   * t is time, tonic is the root freqency relative to which other pitches are 
   * built.
   */
  t: null,

  tonic: null,

  /**
   * BUILT-IN NOTE RELATIONSHIPS
   */
  majorTriad: [0, 4/12, 7/12].map(function (x) { return Math.pow(2, x) }),

  majorArpeggio: [0, 4/12, 7/12, 1, 7/12, 4/12].map(function (x) { return Math.pow(2, x) }),

  minorTriad: [0, 3/12, 7/12].map(function (x) { return Math.pow(2, x) }),

  minorArpeggio: [0, 3/12, 7/12, 1, 7/12, 3/12].map(function (x) { return Math.pow(2, x) }),

  /**
   * METHODS OF PLAYING ARRAYS OF NOTES
   */
  playMelody: function(waveType, baseFreq, notesPerSecond, notesArray) {
    switch(waveType) {
      case 'sin':
        return this.sin(baseFreq * notesArray[Math.floor(this.t * notesPerSecond % notesArray.length)]);
      case 'square':
        return this.square(baseFreq * notesArray[Math.floor(this.t * notesPerSecond % notesArray.length)]);
      case 'sawtooth':
        return this.sawtooth(baseFreq * notesArray[Math.floor(this.t * notesPerSecond % notesArray.length)]);
    }
  },

  playChord: function(waveType, baseFreq, chord) {
    var _this = this;
    var notes = 0;
    chord.forEach(function (note) {
      switch (waveType) {
        case 'sin': notes += _this.sin(baseFreq * note);
        case 'square': notes += _this.square(baseFreq * note);
        case 'sawtooth': notes += _this.sawtooth(baseFreq * note);
      }
    });
    return notes;
  },

  ascendingChord: function(baseFreq, ascendingFactor, notesArray) {
    var _this = this;
    var notes = 0;
    notesArray.forEach(function (note) {
      notes += _this.sin(baseFreq * note * (_this.t / ascendingFactor));
    });
    return notes;
  },

  /**
   * PRECUSSION
   */
  playBeat: function(beatsPerSecond) {
    return this.t % (1 / beatsPerSecond) < 1/24 ? Math.random() : 0
  },
  
  /**
   * SETTERS FOR TIME AND TONIC VARIABLES
   */
  setTime: function (t) {
    this.t = t;
  },

  setTonic: function (freq) {
    this.tonic = freq;
  },
  
  /**
   * DIFFERENT KINDS OF SOUND WAVES
   */
  sin: function (freq) {
    return Math.sin(tau * this.t * freq);
  },

  square: function (freq) {
    return Math.sin(tau * this.t * freq) < 0 ? -1 : 1;
  },
  
  sawtooth: function (freq) {
    return this.t % (1 / freq) * freq * 2 - 1;
  }

};

module.exports = musicUtil;
