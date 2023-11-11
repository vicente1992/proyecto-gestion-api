const mapEventName = (nameEvent = "") => {
  const EVENTS = {
    allergy_contact: "Alergia",
    check_delivery: "Delivery",
    human_contact: "Agente",
    save_order: "Pedido",
  };

  return EVENTS[nameEvent];
};

/**
 *
 * @param {*} hookUrl
 * @param {*} payload
 * @returns
 */
const callHook = async (hookUrl, payload = {}) => {
  try {
    console.log(hookUrl)
    const dataApi = await fetch(hookUrl, {
      method: "POST",
      body: JSON.stringify({payload}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await dataApi.json();
    console.log({ data });
    return data.data;
  } catch (err) {
    return Promise.reject(undefined);
  }
};

module.exports = { mapEventName, callHook };
