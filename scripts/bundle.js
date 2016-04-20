(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function doMain() {
  window.open("index.html", "_self");
}

function doAbout() {
  window.open("about.html", "_self");
}

function setUI() {
  document.getElementById("myMinWeight").defaultValue = "0 lbs ";
  document.getElementById("myMinWeight").readOnly = true;
  document.getElementById("myMinWeight").style.width = "230px";
  document.getElementById("myRuleset").style.width = "230px";
  document.getElementById("myDisplacement").style.width = "170px";
  document.getElementById("myCalculate").style.width = "230px";
  setDefaults();
}

function setDefaults() {
  document.getElementById("myRuleset").value = "2013 SCCA Solo Rules";
  document.getElementById("myMinWeight").value = "0 lbs ";
  document.getElementById("myWheelDiameter").value = "16\"";
  document.getElementById("myWheelWidth").value = "10\"";
  document.getElementById("myDisplacement").value = "";
  document.getElementById("myCylinders").value = "8-cyl";
  document.getElementById("myUnits").value = "cc";
  document.getElementById("myClass").value = "XP";
  document.getElementById("myDrive").value = "RWD";
  document.getElementById("forcedInduction").checked = false;
  document.getElementById("abs").checked = false;
  document.getElementById("tractionControl").checked = false;
  document.getElementById("suspension").checked = false;
  document.getElementById("engine").checked = false;
  document.getElementById("valves").checked = false;
  document.getElementById("solidaxle").checked = false;
  document.getElementById("twoseater").checked = false;
  document.getElementById("skinnytire").checked = false;
  document.getElementById("pushrod").checked = false;
  document.getElementById("bias").checked = false;
  document.getElementById("tubbed").checked = false;
  window.scrollTo(0, 0);
}

function calculateWeight() {
  var fi = document.getElementById("forcedInduction").checked;
  var abs = document.getElementById("abs").checked;
  var traction = document.getElementById("tractionControl").checked;
  var suspension = document.getElementById("suspension").checked;
  var engine = document.getElementById("engine").checked;
  var twovalve = document.getElementById("valves").checked;
  var solidaxle = document.getElementById("solidaxle").checked;
  var twoseater = document.getElementById("twoseater").checked;
  var skinnytire = document.getElementById("skinnytire").checked;
  var pushrod = document.getElementById("pushrod").checked;
  var bias = document.getElementById("bias").checked;
  var tubbed = document.getElementById("tubbed").checked;

  var cylinders = document.getElementById("myCylinders").value;
  var units = document.getElementById("myUnits").value;
  var myclass = document.getElementById("myClass").value;
  var mydrive = document.getElementById("myDrive").value;

  var rotary = false;
  var min_weight, weight_multiplier, displacement_raw, displacement_in_cc, displacement_in_liters, per_liter_adder;

  var rs = document.getElementById("myRuleset").value.split(" ");
  var rule_year = Number(rs[0]);

  if (cylinders == "2-rtr" || cylinders == "3-rtr") {
    rotary = true;
  }

  var ww = document.getElementById("myWheelWidth").value.split("\"");
  var wheel_width = Number(ww[0]);

  var wd = document.getElementById("myWheelDiameter").value.split("\"");
  var wheel_diameter = Number(wd[0]);

  displacement_raw = Number(document.getElementById("myDisplacement").value);

  // Convert displacement to cubic centimeters if needed
  if (units == "cc") {
    displacement_in_cc = displacement_raw;
    displacement_in_liters = displacement_raw / 1000;
  } else if (units == "l") {
    displacement_in_cc = displacement_raw * 1000;
    displacement_in_liters = displacement_raw;
  } else if (units == "ci") {
    displacement_in_cc = displacement_raw * 16.387064;
    displacement_in_liters = displacement_in_cc / 1000;
  }

  // Class specific conversions 
  switch (myclass) {

    // XP
    case "XP":
      per_liter_adder = 0;
      if (engine) {
        per_liter_adder = 20;
      }
      if (rotary) {
        displacement_in_liters *= 2;
      }
      if (fi) {
        displacement_in_liters *= 1.4;
      }
      if (displacement_in_liters < 4.0) {
        if (mydrive == "FWD") min_weight = 1200 + (150 + per_liter_adder) * displacement_in_liters;else if (mydrive == "RWD") min_weight = 1200 + (200 + per_liter_adder) * displacement_in_liters;else if (mydrive == "AWD") min_weight = 1200 + (250 + per_liter_adder) * displacement_in_liters;
      } else {
        if (mydrive == "FWD") min_weight = 1200 + (130 + per_liter_adder) * displacement_in_liters;else if (mydrive == "RWD") min_weight = 1200 + (180 + per_liter_adder) * displacement_in_liters;else if (mydrive == "AWD") min_weight = 1200 + (250 + per_liter_adder) * displacement_in_liters;
      }
      if (min_weight > 2300) {
        min_weight = 2300;
      }
      if (abs) {
        min_weight += 50;
      }
      if (traction) {
        min_weight += 50;
      }
      if (suspension) {
        min_weight += 100;
      }
      if (rule_year > 2012 && fi) {
        if (mydrive == "FWD") if (min_weight < 1575) min_weight = 1575;else if (mydrive == "RWD") if (min_weight < 1700) min_weight = 1700;else if (mydrive == "AWD") if (min_weight < 1825) min_weight = 1825;
      }
      break;

    // BP
    case "BP":
      if (rotary && fi) {
        min_weight = 2300;
      } else if (fi) {
        if (displacement_in_cc > 3200) min_weight = 2600;else if (displacement_in_cc > 2700) min_weight = 2300;else min_weight = 2200;
      } else {
        if (displacement_in_cc > 6500) min_weight = 2800;else if (displacement_in_cc > 6000) min_weight = 2700;else if (displacement_in_cc > 5100) min_weight = 2600;else min_weight = 2450;
      }
      if (wheel_width > 10) {
        min_weight += 50;
      }
      if (wheel_diameter > 16) {
        min_weight += 100;
      }
      break;
    // CP
    case "CP":
      if (cylinders == "8-cyl") {
        if (displacement_in_cc > 5100) min_weight = 3000;else min_weight = 2700;
      } else if (cylinders == "6-cyl") {
        if (displacement_in_cc > 4500) {
          min_weight = 0;
          break;
        }
        if (fi) min_weight = 2550;else min_weight = 2450;
      } else if (cylinders == "4-cyl") {
        if (fi) min_weight = 2450;else {
          min_weight = 0;
          break;
        }
      } else {
        min_weight = 0;
        break;
      }
      if (wheel_width > 10) {
        min_weight += 50;
      }
      if (wheel_diameter > 16) {
        min_weight += 50;
      }
      break;
    // DP
    case "DP":
      if (displacement_in_cc <= 1667) {
        min_weight = displacement_in_cc * 1.06;
      } else {
        min_weight = displacement_in_cc * 0.91 + 250;
      }
      if (wheel_width > 10) {
        min_weight += 100;
      }
      break;
    // EP
    case "EP":
      if (rotary) min_weight = displacement_in_cc * 0.85;else min_weight = displacement_in_cc * 1.00;
      if (min_weight < 1350) {
        min_weight = 1350;
      }
      if (min_weight > 2200) {
        min_weight = 2200;
      }
      if (twovalve) {
        if (wheel_width > 10) min_weight += 100;
      } else {
        if (wheel_width > 7) min_weight += 75;
        if (wheel_width > 10) min_weight += 75;
      }
      break;
    // FP
    case "FP":
      if (rotary) weight_multiplier = 0.70;else weight_multiplier = 0.75;
      if (fi) {
        weight_multiplier += 0.450;
      }
      if (mydrive == "AWD") {
        weight_multiplier += 0.100;
      }
      if (mydrive == "FWD") {
        weight_multiplier -= 0.100;
      }
      min_weight = weight_multiplier * displacement_in_cc;
      if (min_weight < 1900) {
        min_weight = 1900;
      }
      if (min_weight > 2700) {
        min_weight = 2700;
      }
      if (wheel_width > 10) {
        min_weight += 100;
      }
      break;
    // DM
    case "DM":
      if (displacement_in_cc > 2000) {
        min_weight = 0;
        break;
      }
      if (rotary) {
        if (displacement_in_cc < 1200) min_weight = 1280;else min_weight = 1380;
      } else if (displacement_in_cc > 1800) {
        min_weight = 1380;
      } else {
        min_weight = 1280;
      }
      if (mydrive == "RWD") {
        if (bias) min_weight -= 35;
      } else if (mydrive == "FWD") {
        if (bias) min_weight -= 35;
      } else if (mydrive == "AWD") {
        min_weight += 200;
      }
      if (tubbed) min_weight += 40;
      break;
    // EM
    case "EM":
      if (rotary) {
        if (cylinders == "3-rtr") min_weight = 1800;else min_weight = 1700;
      } else if (pushrod) {
        if (displacement_in_cc > 4500) min_weight = 1800;else min_weight = 1700;
      } else {
        if (displacement_in_cc > 3200) min_weight = 1800;else min_weight = 1700;
      }
      if (mydrive == "RWD") {
        if (bias) min_weight -= 50;
      } else if (mydrive == "FWD") {
        if (bias) min_weight -= 50;
      } else if (mydrive == "AWD") {
        min_weight += 300;
      }
      if (tubbed) min_weight += 50;
      break;
    // SM
    case "SM":
      per_liter_adder = 0;
      if (rotary) {
        if (cylinders == "3-rtr") displacement_in_liters += 0.9 * 3;else displacement_in_liters += 0.9 * 2;
      }
      if (engine) {
        per_liter_adder += 25;
      }
      if (solidaxle) {
        per_liter_adder -= 25;
      }
      if (fi) {
        displacement_in_liters += 1.4;
      }
      if (mydrive == "RWD") min_weight = 1800 + (200 + per_liter_adder) * displacement_in_liters;else if (mydrive == "FWD") min_weight = 1550 + (125 + per_liter_adder) * displacement_in_liters;else if (mydrive == "AWD") min_weight = 1800 + (300 + per_liter_adder) * displacement_in_liters;
      if (skinnytire) {
        min_weight -= 200;
      }
      if (min_weight > 3100) {
        min_weight = 3100;
      }
      break;
    // SSM
    case "SSM":
      if (!twoseater) {
        min_weight = 0;
        break;
      }
      per_liter_adder = 0;
      if (rotary) {
        if (cylinders == "3-rtr") displacement_in_liters += 0.9 * 3;else displacement_in_liters += 0.9 * 2;
      }
      if (engine) {
        per_liter_adder += 25;
      }
      if (fi) {
        displacement_in_liters += 1.4;
      }
      if (mydrive == "RWD") min_weight = 1600 + (200 + per_liter_adder) * displacement_in_liters;else if (mydrive == "FWD") min_weight = 1350 + (125 + per_liter_adder) * displacement_in_liters;else if (mydrive == "AWD") min_weight = 1600 + (300 + per_liter_adder) * displacement_in_liters;
      if (skinnytire) {
        min_weight -= 200;
      }
      if (min_weight > 2900) {
        min_weight = 2900;
      }
      break;
    // SMF
    case "SMF":
      if (mydrive == "RWD" || mydrive == "AWD") {
        min_weight = 0;
        break;
      }
      if (rotary) {
        if (cylinders == "3-rtr") displacement_in_liters += 0.9 * 3;else displacement_in_liters += 0.9 * 2;
      }
      if (rule_year > 2012) {
        if (fi) {
          displacement_in_liters += 1.0;
        }
        if (twoseater) min_weight = 1810 + 125 * displacement_in_liters; // 2-seater
        else min_weight = 1750 + 125 * displacement_in_liters; // 4-seater
      } else {
          if (fi) {
            displacement_in_liters += 1.4;
          }
          if (twoseater) min_weight = 1610 + 125 * displacement_in_liters; // 2-seater
          else min_weight = 1550 + 125 * displacement_in_liters; // 4-seater
        }
      if (min_weight > 3100) {
        min_weight = 3100;
      }
      break;
    default:
      min_weight = 0;
      break;
  }
  window.scrollTo(0, 0);
  if (displacement_raw == "") alert("Please enter a displacement!");else if (min_weight != 0) {
    document.getElementById("myMinWeight").value = Math.round(min_weight) + " lbs ";
  } else {
    document.getElementById("myMinWeight").value = "Invalid config! ";
  }
}

},{}]},{},[1])


//# sourceMappingURL=bundle.js.map