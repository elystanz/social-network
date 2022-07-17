const { Schema, model, Types } = require('mongoose');
// using moment to get date data for thoughts
const moment = require('moment');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },

    reactionBody: {
      type: String,
      required: true,
      // keep the original tweet character length alive !
      maxlength: 280,
    },

    username: {
      type: String,
      required: true,
    },

    createdAt: {
      // use moment to set date and time data
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("hh:mm a [on] MMM DD, YYYY"),
    },
  },

  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('hh:mm a [on] MMM DD, YYYY')
    },

    username: {
        type: String,
        required: true
    },

    reactions: [reactionSchema]
},

    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// create thought via the schema, then export
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;