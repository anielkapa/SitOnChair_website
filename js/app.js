document.addEventListener("DOMContentLoaded", function() {

  //navigation in nav, hiding or showing menu tab

  let navI = document.getElementById("menu");
  let liMainList = navI.children[0].children;

  for (let i = 0; i < liMainList.length; i++) {
    liMainList[i].addEventListener("mouseover", function(event) {
      liMainList[i].children[0].style.display = "flex";
      liMainList[i].style.color = "#27C7AB";

    });
    liMainList[i].addEventListener("mouseleave", function(event) {

      liMainList[i].children[0].style.display = "none";
      liMainList[i].style.color = "white";

    });
  };

  // slider w sekcji main
  let arrows = document.getElementsByClassName("main_arrow"); //strzalki nawigacji
  let preArrow = arrows[0];
  let nextArrow = arrows[1];
  let mainImageList = document.querySelector("ul.slider"); //pobieram listę ul
  let mainImageLi = mainImageList.querySelectorAll("li"); // pobieram wszystkie li
  let imageList = [];
  for (var i = 0; i < mainImageLi.length; i++) {
    imageList.push(mainImageLi[i].children[0]);
  }

  let counter = 0;
  let visiblePicture = document.getElementsByClassName("visible"); //widoczne zdjecie

  preArrow.addEventListener("click", function(event) {
    console.log("klik");
    visiblePicture[0].classList.remove("visible");
    if (counter < imageList.length - 1) {
      counter++;
    } else {
      counter = 0;
    }
    mainImageLi[counter].classList.add("visible");

  });

  nextArrow.addEventListener("click", function(event) {
    console.log("klik");
    visiblePicture[0].classList.remove("visible");
    if (counter < imageList.length - 1) {
      counter++;
    } else {
      counter = 0;
    }
    mainImageLi[counter].classList.add("visible");

  });

  // gallery form claire and margerita section - zooming pictures

  let galleryElements = document.getElementsByClassName("gallery");
  let bodyElement = document.getElementsByTagName("body");
  let opacity = document.getElementsByClassName("pictures_opacity");

  for (let i = 0; i < galleryElements.length; i++) {
    galleryElements[i].children[0].addEventListener("click", function(event) {
      let urlAddress = this.getAttribute("src");
      console.log(urlAddress);
      let newDiv = document.createElement("div");
      let newImg = document.createElement("img");
      let newButton = document.createElement("button");
      newDiv.classList.add("fullScreen");
      newImg.setAttribute("src", urlAddress);
      newButton.classList.add("close");
      newButton.innerText = "X";
      bodyElement[0].appendChild(newDiv);
      newDiv.appendChild(newImg);
      newDiv.appendChild(newButton);
      newButton.addEventListener("click", function(event) {
        bodyElement[0].removeChild(newDiv);
      });
    });
    // hiding opacity element
    galleryElements[i].addEventListener("mouseover", function(event) {
      opacity[i].style.visibility = "hidden";
      galleryElements[i].style.cursor = "pointer";

    });
    galleryElements[i].addEventListener("mouseout", function(event) {
      opacity[i].style.visibility = "visible";
      galleryElements[i].style.cursor = "default";
    });
  };



  //transport
  let sumPay = document.querySelector(".sum").children[0];
  let sum = 0;

  let checkboxTransport = document.getElementById("transport");
  let valueTransport = document.querySelector(".transport_value");
  let choosenTransport = document.querySelector(".panel_left").children[3]; //transport in summary_panel

  checkboxTransport.addEventListener("click", function(e) {
    if (checkboxTransport.checked) {
      choosenTransport.innerHTML = "transport";
      valueTransport.innerHTML = checkboxTransport.dataset.transportPrice;
      sum += Number(checkboxTransport.dataset.transportPrice);
      sumPay.innerHTML = sum + "zł";
    } else {
      choosenTransport.innerHTML = "";
      valueTransport.innerHTML = "";
      sum -= Number(checkboxTransport.dataset.transportPrice);
      sumPay.innerHTML = sum + "zł";
    }
  });

  // dropdown list
  let arrowChair = document.getElementsByClassName("list_arrow");
  let chooseList = document.getElementsByClassName("list_panel");
  let imgChair = document.querySelector(".chosen_chair");
  let choosenColor = document.querySelector(".panel_left").children[1]; //color in summary_panel
  let choosenPattern = document.querySelector(".panel_left").children[2]; //pattern in summary_panel
  let choosenTypeName = document.querySelector(".title_type");
  let valueTitle = document.querySelector(".title_value");
  let valueColor = document.querySelector(".color_value");
  let valuePatter = document.querySelector(".pattern_value");


  for (let i = 0; i < arrowChair.length; i++) {
    let liChooseLinst = chooseList[i].children;
    arrowChair[i].addEventListener("click", function(e) {
      if (chooseList[i].style.display === "none" || chooseList[i].style.display === "") {
        chooseList[i].style.display = "block";
      } else {
        chooseList[i].style.display = "none";
      }
    });
    for (let j = 0; j < liChooseLinst.length; j++) {
      // liChooseLinst[j] dropdownlist elements (choose options)
      liChooseLinst[j].addEventListener("mouseover", function(e) {
        liChooseLinst[j].style.color = "#22C6B1";
      });
      liChooseLinst[j].addEventListener("mouseout", function(e) {
        liChooseLinst[j].style.color = "#585858";
      });


      // calculator function - get your quote
      liChooseLinst[j].addEventListener("click", function(e) {
        this.parentElement.classList.remove("visible");
        chooseList[i].style.display = "none";
        let choosenType = this.parentElement.parentElement.querySelector(".list_label");
        choosenType.innerHTML = this.innerHTML;
        if (choosenType.innerHTML === "Czerwony" || choosenType.innerHTML === "Czarny" || choosenType.innerHTML === "Pomarańczowy") {
          choosenColor.innerHTML = this.innerHTML;
          valueColor.innerHTML = this.dataset.price;
        } else if (choosenType.innerHTML === "Tkanina" || choosenType.innerHTML === "Skóra") {
          choosenPattern.innerHTML = this.innerHTML;
          valuePatter.innerHTML = this.dataset.price;
        } else if (choosenType.innerHTML === "Clair" || choosenType.innerHTML === "Margarita" || choosenType.innerHTML === "Selena") {
          choosenTypeName.innerHTML = "Twój fotel " + this.innerHTML;
          valueTitle.innerHTML = this.dataset.price;
        }
        sum = Number(valueColor.innerHTML) + Number(valuePatter.innerHTML) + Number(valueTitle.innerHTML) + Number(valueTransport.innerHTML);
        sumPay.innerHTML = sum + "zł";
        console.log(sum);
        console.log(valueTransport.innerHTML);
      });
    }
  }

  //summary_panel -change picture
  let imageChairToChange = document.querySelector(".chosen_chair");
  let chairType = chooseList[0].children; //dropdownlist - chair types

  for (let i = 0; i < chairType.length; i++) {
    chairType[i].addEventListener("click", function(e) {
      if (chairType[i].innerText === "Clair") {
        imageChairToChange.src = "images/red_chair.png";
        imageChairToChange.style.width = "250px";
        imageChairToChange.style.marginLeft = "0px";
        imageChairToChange.style.marginTop = "80px";
      } else if (chairType[i].innerText === "Margarita") {
        imageChairToChange.src = "images/black_chair.png";
        imageChairToChange.style.width = "350px";
        imageChairToChange.style.marginTop = "70px";
        imageChairToChange.style.marginLeft = "-50px";
      } else if (chairType[i].innerText === "Selena") {
        imageChairToChange.src = "images/wood_chair.jpg";
        imageChairToChange.style.width = "500px";
        imageChairToChange.style.marginLeft = "-100px";
        imageChairToChange.style.marginTop = "-20px";
      }
    });
  }

  // contact form validation
  let buttonWyslij = document.getElementById("send");
  let inputName = document.querySelector("input[type=text]");
  let inputEmail = document.querySelector("input[type=email]");
  let inputMessage = document.querySelector("textarea[type=text]");
  let error = document.querySelector('.error-message');

  let showError = function(errorMessage) {
    error.innerText += errorMessage + '\n';
    return false;
  };
  let clearError = function(canReturn) {
    if (canReturn) {
      error.innerText = "";
    }
    return true;
  };

  buttonWyslij.addEventListener("click", function(event) {
    error.innerText = "";
    let canReturn = inputEmail.value.indexOf('@') !== -1 ? clearError(true) : showError("Email musi posiadać znak @");
    canReturn = inputName.value.length > 3 ? clearError(canReturn) && canReturn : showError("Twoje imię jest za krótkie") && canReturn;
    canReturn = inputMessage.value.length > 20 ? clearError(canReturn) && canReturn : showError("Twoja wiadomość musi mieć minimum 20 znaków") && canReturn;
    if (canReturn === false) {
      event.preventDefault();
    }
  });

});
