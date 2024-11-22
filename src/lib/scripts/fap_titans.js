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

  toStr(p = 3) {
    let suffix = ((this.mantissa - 3) % (FapNumber.FAP_SCALE.length * 3)) / 3;
    let megaSuffix = Math.floor((this.mantissa - 3) / (FAP_SCALE.length * 3));

    return (
      this.coefficient.toPrecision(p) +
      (suffix >= 0 ? FapNumber.FAP_SCALE[suffix] : "") +
      (megaSuffix > 0 ? "D" + megaSuffix : "")
    );
  }

  scientific(p = 3) {
    return this.coefficient.toPrecision(p) + (this.mantissa ? " x 10^" + this.mantissa : "");
  }

  eNotation(p = 3) {
    return this.coefficient.toPrecision(p) + (this.mantissa ? "e" + this.mantissa : "");
  }

  number() {
    return this.coefficient * Math.pow(10, this.mantissa);
  }

  sub(other) {
    let deltaM = this.mantissa - other.mantissa;
    let coefficient = this.coefficient * Math.pow(10, deltaM) - other.coefficient;

    return FapNumber.fromScientific(coefficient, other.mantissa);
  }

  div(other) {
    return FapNumber.fromNumber((this.coefficient / other.coefficient) * Math.pow(10, this.mantissa - other.mantissa));
  }
}

export { MULTIPLIERS, MULT_KEY_CODES, SKILL_LOCKS, FapNumber };
