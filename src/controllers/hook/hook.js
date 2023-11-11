const { matchedData } = require("express-validator");
const hookModel = require("../../models/hook");
const eventModel = require("../../models/event");
const { handleHttpError } = require("../../utils/handleError");

/**
 * Register webhook (zapier)
 * @param {*} req
 * @param {*} res
 */
const registerHook = async (req, res) => {
  try {
    const body = matchedData(req);
    console.log(">>>>>>>>>>>", body);
    const data = await hookModel.create(body);
    res.status(201);
    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_CREATE_HOOK");
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const getListEventsHook = async (req, res) => {
  try {
    //TODO aqui necesitamos un array de los eventos basado en el tenantId y evento
      const body = matchedData(req);
      const prevEvents = await eventModel.find(body).limit(3)
      if(!prevEvents.length) {
        const MOCK_EVENTOS = [
          {
            name: "allergy_contact",
            payload: {
              data: new Date().toDateString(),
              phone: "ctx.from",
              message: "ctx.body",
            },
          },
          {
            name: "check_delivery",
            payload: {
              data: new Date().toDateString(),
              phone: "ctx.from",
              message: "ctx.body",
            },
          },
          {
            name: "save_order",
            payload: {
              data: new Date().toDateString(),
              phone: "ctx.from",
              order: "ctx.body",
              total:0
            },
          },
          {
            name: "human_contact",
            payload: {
              data: new Date().toDateString(),
              phone: "9898988",
              message: "resumeText",
            },
          },
         
        ];
        res.send(MOCK_EVENTOS)
        return
      }
      console.log('>>>>>>>>>',body, prevEvents)
      res.send(prevEvents)
      return
    //   const data = await hookModel.create(body);
    //   res.status(201);
;
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_GET_HOOK");
  }
};

module.exports = { registerHook, getListEventsHook };
