const container = document.createElement("div");
container.classList.add("container");
document.body.appendChild(container);

async function fetchRandomDogImage(breed) {
  try {
    const response = await fetch(
      `https://dog.ceo/api/breed/${breed}/images/random`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch data for breed: ${breed}`);
    }
    const data = await response.json();
    if (data.status === "success") {
      return data.message;
    } else {
      throw new Error(`Failed to fetch image for breed: ${breed}`);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function fetchBreedText(breed) {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${breed}`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch Wikipedia data for breed: ${breed}`);
    }
    const data = await response.json();
    return data.extract;
  } catch (error) {
    console.error(error);
    return null;
  }
}

(async () => {
  const container = document.querySelector(".container");

  const createWikiItem = async (breedName, wikiText, breed) => {
    const wikiItem = document.createElement("div");
    wikiItem.classList.add("wiki-item");

    const wikiHeader = document.createElement("h1");
    wikiHeader.classList.add("wiki-header");
    wikiHeader.textContent = breedName;

    const wikiContent = document.createElement("div");
    wikiContent.classList.add("wiki-content");

    const wikiTextElement = document.createElement("p");
    wikiTextElement.classList.add("wiki-text");
    wikiTextElement.textContent = wikiText;

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");

    const wikiImg = document.createElement("img");
    wikiImg.classList.add("wiki-img");

    const imageUrl = await fetchRandomDogImage(breed);
    if (imageUrl) {
      wikiImg.src = imageUrl;
    }

    imgContainer.appendChild(wikiImg);
    wikiContent.appendChild(wikiTextElement);
    wikiContent.appendChild(imgContainer);
    wikiItem.appendChild(wikiHeader);
    wikiItem.appendChild(wikiContent);

    container.appendChild(wikiItem);
  };

  const dogBreeds = ["husky", "beagle", "poodle", "akita", "bulldog", "corgi"];

  // Generate five wiki items
  for (const breed of dogBreeds) {
    const breedName = breed.charAt(0).toUpperCase() + breed.slice(1);
    const wikiText = await fetchBreedText(breed);
    await createWikiItem(breedName, wikiText, breed);
  }
})();
