export const userListModel = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/users/list");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // console.log(response.json());
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const userModel = async (userId) => {
  try {
    const response = await fetch(`http://localhost:8080/api/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const photoOfUserModel = async (userId) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/photos/${userId}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const schemaModel = async () => {
  try {
    const response = await fetch("https://y2y8tg-8080.csb.app/test/info");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return 0;
  }
};
