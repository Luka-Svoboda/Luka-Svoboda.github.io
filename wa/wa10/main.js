const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

const storyText = "It was 6000 fahrenheit outside, so :insertx: took a drive in their 2014 For Focus ST with a stage 1+ tune, wing risers, a COBB short shifter, and a full, sounerous, Tseudo Cat-back exhaust. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 1400 pounds, and they hadn't had their meds this morning."
const insertX = ["Kai Cenat", "Baby Gronk", "Skibbity Toilet"]
const insertY = ["Your childhood home", "The AMP House", "Lil Cesars"]
const insertZ = ["surprisingly, immediately burnt to a complete crisp", "yelled gyyyat damm! and dissapeared into dust", "simultaneously sneezed and farted, causing their head to explode"]


randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;
    const xItem = randomValueFromArray(insertX);
    const yItem = randomValueFromArray(insertY);
    const zItem = randomValueFromArray(insertZ);

    newStory = newStory.replaceAll(':insertx:', xItem);
    newStory = newStory.replace(':inserty:', yItem);
    newStory = newStory.replace(':insertz:', zItem);


    if (customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replaceAll('Bob', name);
    }

  if(document.getElementById("uk").checked) {
    const weight = Math.round(1400/14) + " stone";
    const temperature =  Math.round((6000-32) * 5 / 9) + " centigrade";
    newStory = newStory.replace('6000 fahrenheit', temperature);
    newStory = newStory.replace('1400 pounds', weight);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}