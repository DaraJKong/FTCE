const MULTIPLIERS = ["x1", "x10", "x25", "x100", "x200", "x500", "x1000"];
const MULT_KEY_CODES = [0, 90, 88, 67, 86, 66, 78];
const SKILL_LOCKS = [
  { name: "Akira Hitsujikai", lvl: 25 },
  { name: "Hoshi Asashin", lvl: 100 },
  { name: "Mariko Kikaibaka", lvl: 75 },
  { name: "Kamiko Furuto", lvl: 100 },
  { name: "Mi Hyo", lvl: 250 },
  { name: "Takaro Kaminoken", lvl: 75 },
  { name: "Amaya Karasu", lvl: 75 },
];

class FapLocation {
  constructor(hash = "*", world = "*") {
    this.hash = hash;
    this.world = world;
  }

  static get LOCATION_NAMES() {
    return ["earthworld", "underworld", "darkworld"];
  }

  static get current() {
    let world_id = document.querySelector("#root div.main").className.match(/(?<=world)\d+/g)[0];
    return new FapLocation(window.location.hash, this.LOCATION_NAMES[parseInt(world_id)]);
  }

  static check(location) {
    let current = this.current;

    let correct_hash = current.hash == location.hash || location.hash == "*";
    let correct_world = current.world == location.world || location.world == "*";

    return correct_hash && correct_world;
  }

  static goToHash(hash) {
    if (hash != "*") {
      window.location.href = hash;
    }
  }

  static goToWorld(world) {
    if (world != "*") {
      window.location.href = "#/";
      let worldBtn = document.querySelector("div." + world + ".world-portal");

      if (worldBtn) {
        worldBtn.click();
      }
    }
  }

  static goTo(location) {
    this.goToWorld(location.world);
    this.goToHash(location.hash);

    return this.check(location);
  }

  static goToByStep(location) {
    let current = this.current;

    if (current.world != location.world) {
      this.goToWorld(location.world);
    } else if (current.hash != location.hash) {
      this.goToHash(location.hash);
    }

    return this.check(location);
  }
}

class FapNumber {
  constructor(coefficient, mantissa) {
    this.coefficient = coefficient;
    this.mantissa = mantissa;
  }

  static get FAP_SCALE() {
    return ["K", "M", "B", "T", "q", "Q", "s", "S", "O", "N", "d", "U", "D"];
  }

  static get ZERO() {
    return new FapNumber(0, 0);
  }

  static fromStr(str) {
    let parts = [...str.matchAll(/^([\d.]+)([KMBTqQsSONdUD])*(D\d+)*$/g)][0];

    let coefficient = parseFloat(parts[1]);
    let mantissa = 0;

    if (parts[2]) {
      mantissa = (FapNumber.FAP_SCALE.indexOf(parts[2]) + 1) * 3;
    }

    if (parts[3]) {
      mantissa += parseInt(parts[3].slice(1)) * FapNumber.FAP_SCALE.length * 3;
    }

    return new FapNumber(coefficient, mantissa);
  }

  static fromNumber(n) {
    return FapNumber.fromScientific(n, 0);
  }

  static fromScientific(c, m) {
    let deltaM = Math.trunc(Math.log10(c) / 3) * 3;
    let coefficient = c / Math.pow(10, deltaM);

    return new FapNumber(coefficient, m + deltaM);
  }

  sub(other) {
    let deltaM = this.mantissa - other.mantissa;
    let coefficient = this.coefficient * Math.pow(10, deltaM) - other.coefficient;

    return FapNumber.fromScientific(coefficient, other.mantissa);
  }

  div(other) {
    return FapNumber.fromNumber((this.coefficient / other.coefficient) * Math.pow(10, this.mantissa - other.mantissa));
  }

  toStr(p = 3) {
    let suffix = ((this.mantissa - 3) % (FapNumber.FAP_SCALE.length * 3)) / 3;
    let megaSuffix = Math.floor((this.mantissa - 3) / (FAP_SCALE.length * 3));

    return (
      this.coefficient.toPrecision(p) +
      (suffix >= 0 ? FapNumber.FAP_SCALE[suffix] : "") +
      (megaSuffix > 0 ? "D" + megaSuffix : "")
    );
  }

  toNumber() {
    return this.coefficient * Math.pow(10, this.mantissa);
  }

  toScientific(p = 3) {
    return this.coefficient.toPrecision(p) + (this.mantissa ? " x 10^" + this.mantissa : "");
  }

  toENotation(p = 3) {
    return this.coefficient.toPrecision(p) + (this.mantissa ? "e" + this.mantissa : "");
  }
}

class Hero {
  constructor(elem) {
    this.elem = elem;
    this.name = elem.querySelector("div.hero-name").textContent;
  }

  get btn() {
    let btn = this.elem.querySelector("div.color-btn:not(.disabled)");
    return btn ? btn.children[0] : null;
  }

  get abilityBtn() {
    let ability = this.elem.querySelector("div.hero-abil-icon");
    return ability ? ability.children[0] : null;
  }

  get lvl() {
    return parseInt(this.elem.querySelector("div.hero-level").textContent);
  }

  get dps() {
    return FapNumber.fromStr(this.elem.querySelector("div.hero-dps").textContent);
  }

  get price() {
    if (FapLocation.current.world == "darkworld") {
      return FapNumber.fromStr(this.elem.querySelector("span.f-dark_gold").textContent);
    } else {
      return FapNumber.fromStr(this.elem.querySelector("span.f-gold").textContent);
    }
  }

  click() {
    this.btn().click();
  }
}

export { MULTIPLIERS, MULT_KEY_CODES, SKILL_LOCKS, FapLocation, FapNumber, Hero };
