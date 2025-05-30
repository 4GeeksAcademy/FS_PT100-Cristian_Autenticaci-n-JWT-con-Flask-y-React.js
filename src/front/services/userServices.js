const userServices = {};
const backendUrl = import.meta.env.VITE_BACKEND_URL;

userServices.register = async (formData) => {
  try {
    const resp = await fetch(backendUrl + "/api/register", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    if (!resp.ok) throw Error("something went wrong");
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default userServices;
