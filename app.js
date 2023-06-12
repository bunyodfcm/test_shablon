// A4 3508 x 2480 px
let ww = 2480; // ekran uzunligi
let hh = 3508;
let pageStyle = "l"; //gorizontal "l" yoki vertikalligi "p"
if (pageStyle == "l") {
  ww = 3508;
  hh = 2480;
}

const toX = (n) => {
  return (ww * n) / 200;
};
const toY = (n) => {
  return (hh * n) / 100;
};

// ranglar
let anchorColor = "#00f";

// javob katakchalari uchun o'zgaruvchilar
let startX = toX(10); //Gorizontal boshlanish nuqtasi
let startY = toY(10); // Vertikal boshlanish nuqtasi
let answerLineColor = "blue"; //javoblardagi chiziqlar rangi
let marginRects = toX(2); //tortburchaklar orasidagi bo'sh joy
let countTest = 290; //jami testlar soni
let countColumn = 2; //ustunlar soni
let countTestColumn = 40; //har bir ustundagi testlar soni
let subjectName = true; //fan nomi bor yo'qligi
let subjectNameColor = "#150fa1"; //fan nomi rangi
const subject = ["Majburiy fanlar", "matematika", "fizika"]; //fanlar royhati
let subjectNameHeight = toY(2); //fan nomi balandligi
let widthOrdinalNumber = toX(3); //tarrib raqamlar joyining uzunligi
let circleRadius = toX(0.75); //javob aylanasi radiusi
let circleMargin = toX(0.25); //javob aylanasi tashqarisidagi joy
let circleBgColor = "white"; //aylana ichining rangi
let circleBorderColor = "red"; //aylana devor rangi
let circleTextColor = "#aa4500"; //aylana ichidagi harflar rangi
let variantTypes = ["A", "B", "C", "D", "E"]; //Nechaxil variant ekanligini ham aniqlaydi
let variantTextSize = 28; //javoblardagi yozuv o'lchami
if (!subjectName) {
  subjectNameHeight = 0;
}
let widthAnswerRect =
  widthOrdinalNumber + 2 * (circleMargin + circleRadius) * variantTypes.length;
let HeightAnswerRect =
  subjectNameHeight + (circleMargin + circleRadius) * (2 * countTestColumn + 1);
const answersColumn = (doc) => {
  if (Math.ceil(countTest / countTestColumn) > countColumn) {
    countColumn = Math.ceil(countTest / countTestColumn);
  }

  for (let i = 0; i < countColumn; i++) {
    doc.setDrawColor(answerLineColor);
    let startingPoint = startX + i * (widthAnswerRect + marginRects);
    doc.rect(startingPoint, startY, widthAnswerRect, HeightAnswerRect);
    if (subjectName) {
      doc.line(
        startingPoint,
        startY + subjectNameHeight,
        startingPoint + widthAnswerRect,
        startY + subjectNameHeight
      );
      if (subject.length > i) {
        doc.setFontSize(variantTextSize);
        doc.setTextColor(subjectNameColor);
        doc.text(
          subject[i],
          startingPoint + widthAnswerRect / 2,
          startY + subjectNameHeight * 0.6,
          "center"
        );
      }
    }
    doc.line(
      startingPoint + widthOrdinalNumber,
      startY + subjectNameHeight,
      startingPoint + widthOrdinalNumber,
      startY + HeightAnswerRect
    );
    // tartib raqami va kalitlar
    for (let j = 0; j < countTestColumn; j++) {
      let bottomAnsCoor =
        startY +
        subjectNameHeight +
        (circleMargin + circleRadius) * 2 * (j + 1) -
        circleMargin;
      if (countTestColumn * i + j < countTest) {
        doc.setTextColor(circleTextColor);
        doc.text(
          (countTestColumn * i + j + 1).toString(),
          startingPoint + widthOrdinalNumber / 2,
          bottomAnsCoor + 0.5 * circleRadius,
          "center"
        );
        for (let k = 0; k < variantTypes.length; k++) {
          const element = variantTypes[k];
          let startCirclecoorX =
            startX +
            widthOrdinalNumber +
            (circleRadius + circleMargin) * (k * 2 + 1) +
            (widthAnswerRect + marginRects) * i;
          if (element != "") {
            doc.setDrawColor(circleBorderColor);
            doc.setFillColor(circleBgColor);
            doc.circle(startCirclecoorX, bottomAnsCoor, circleRadius, "FD");
            doc.text(
              element.toString(),
              startCirclecoorX,
              bottomAnsCoor + 0.5 * circleRadius,
              "center"
            );
          }
        }
      }
    }
  }
};

const test = () => {
  $("#print-chart-btn").on("click", function () {
    var doc = new jsPDF({
      orientation: pageStyle,
      unit: "pt",
      format: [ww, hh],
    });

    doc.rect(10, 10, toX(90), 20);

    answersColumn(doc);

    //pdf.save("c:\a4.pdf");
    var blob = doc.output("bloburl");
    window.open(blob);
  });
};
