import LinkModel from "../models/linkModel.js"
import ClickModel from "../models/clickModel.js"

const LinksController = {

  getList: async (req, res) => {
    try {
      const links = await LinkModel.find();
      res.json(links);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  getById: async (req, res) => {
    try {
        const link = await LinkModel.findById(req.params.id);

        const clicksByTargetValues = {};
            link.targetValues.forEach(targetValue => {
              link.clicks.forEach(click => {
                if (click.targetParamValue === targetValue.value) {
                    if (!clicksByTargetValues[targetValue.name]) {
                        clicksByTargetValues[targetValue.name] = [];
                    }
                    clicksByTargetValues[targetValue.name].push(click);
                }
            });
        });

        link.clicks.forEach(click => {
          if (click.targetParamValue === undefined) {
              if (!clicksByTargetValues["no target"]) {
                  clicksByTargetValues["no target"] = [];
              }
              clicksByTargetValues["no target"].push(click);
          }
      });

        res.json(clicksByTargetValues);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
},

  redirect: async (req, res) => {
    try {

      const link = await LinkModel.findById(req.params.id);

      const newClick = new ClickModel({
        ipAddress: req.ip
      });

      const target = req.query[link.targetParamName];
      if (target != undefined) {
        newClick.targetParamValue = target
      }
      link.clicks.push(newClick);

      await link.save();
      res.redirect(link.originalUrl)
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  add: async (req, res) => {
    const { originalUrl } = req.body;
    try {
      const newLink = await LinkModel.create({ originalUrl });
      res.json(newLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedLink = await LinkModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await LinkModel.findByIdAndDelete(id);
      res.json(deleted);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
};

export default LinksController;
