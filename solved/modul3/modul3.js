//zadanie 1
String.prototype.trim = function() {
    return this.replace(/^\s+/, "").replace(/\s+$/, "");
}
console.log("  test  " + "\n" + "  test  ".trim());
//zadanie 2
var pracownik = {
    stanowisko: "Administrator",
    pesja: "3000PLN",
    wiek: "30",
    pracuj: function() {
        return console.log("Pracuje");
    }
}
var pracownik2 = new function() {
    this.stanowisko = "Administrator";
    this.pensja = "300PLN";
    this.wiek = "30";
    this.pracuj = function() {
        return console.log("Pracuje");
    };
}
