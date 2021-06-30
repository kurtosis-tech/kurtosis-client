// source: api_container_service.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

goog.provide('proto.api_container_api.WaitForEndpointAvailabilityArgs');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.api_container_api.WaitForEndpointAvailabilityArgs = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.api_container_api.WaitForEndpointAvailabilityArgs, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.api_container_api.WaitForEndpointAvailabilityArgs.displayName = 'proto.api_container_api.WaitForEndpointAvailabilityArgs';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.api_container_api.WaitForEndpointAvailabilityArgs.prototype.toObject = function(opt_includeInstance) {
  return proto.api_container_api.WaitForEndpointAvailabilityArgs.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.api_container_api.WaitForEndpointAvailabilityArgs} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api_container_api.WaitForEndpointAvailabilityArgs.toObject = function(includeInstance, msg) {
  var f, obj = {
    serviceId: jspb.Message.getFieldWithDefault(msg, 1, ""),
    port: jspb.Message.getFieldWithDefault(msg, 2, 0),
    path: jspb.Message.getFieldWithDefault(msg, 3, ""),
    initialDelaySeconds: jspb.Message.getFieldWithDefault(msg, 4, 0),
    retries: jspb.Message.getFieldWithDefault(msg, 5, 0),
    retriesDelayMilliseconds: jspb.Message.getFieldWithDefault(msg, 6, 0),
    bodyText: jspb.Message.getFieldWithDefault(msg, 7, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.api_container_api.WaitForEndpointAvailabilityArgs}
 */
proto.api_container_api.WaitForEndpointAvailabilityArgs.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.api_container_api.WaitForEndpointAvailabilityArgs;
  return proto.api_container_api.WaitForEndpointAvailabilityArgs.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.api_container_api.WaitForEndpointAvailabilityArgs} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.api_container_api.WaitForEndpointAvailabilityArgs}
 */
proto.api_container_api.WaitForEndpointAvailabilityArgs.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setServiceId(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setPort(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setPath(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setInitialDelaySeconds(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setRetries(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setRetriesDelayMilliseconds(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setBodyText(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.api_container_api.WaitForEndpointAvailabilityArgs.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.api_container_api.WaitForEndpointAvailabilityArgs.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.api_container_api.WaitForEndpointAvailabilityArgs} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api_container_api.WaitForEndpointAvailabilityArgs.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getServiceId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getPort();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = message.getPath();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getInitialDelaySeconds();
  if (f !== 0) {
    writer.writeUint32(
      4,
      f
    );
  }
  f = message.getRetries();
  if (f !== 0) {
    writer.writeUint32(
      5,
      f
    );
  }
  f = message.getRetriesDelayMilliseconds();
  if (f !== 0) {
    writer.writeUint32(
      6,
      f
    );
  }
  f = message.getBodyText();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
};


/**
 * optional string service_id = 1;
 * @return {string}
 */
proto.api_container_api.WaitForEndpointAvailabilityArgs.prototype.getServiceId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.api_container_api.WaitForEndpointAvailabilityArgs} returns this
 */
proto.api_container_api.WaitForEndpointAvailabilityArgs.prototype.setServiceId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional uint32 port = 2;
 * @return {number}
 */
proto.api_container_api.WaitForEndpointAvailabilityArgs.prototype.getPort = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.api_container_api.WaitForEndpointAvailabilityArgs} returns this
 */
proto.api_container_api.WaitForEndpointAvailabilityArgs.prototype.setPort = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional string path = 3;
 * @return {string}
 */
proto.api_container_api.WaitForEndpointAvailabilityArgs.prototype.getPath = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.api_container_api.WaitForEndpointAvailabilityArgs} returns this
 */
proto.api_container_api.WaitForEndpointAvailabilityArgs.prototype.setPath = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional uint32 initial_delay_seconds = 4;
 * @return {number}
 */
proto.api_container_api.WaitForEndpointAvailabilityArgs.prototype.getInitialDelaySeconds = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.api_container_api.WaitForEndpointAvailabilityArgs} returns this
 */
proto.api_container_api.WaitForEndpointAvailabilityArgs.prototype.setInitialDelaySeconds = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional uint32 retries = 5;
 * @return {number}
 */
proto.api_container_api.WaitForEndpointAvailabilityArgs.prototype.getRetries = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.api_container_api.WaitForEndpointAvailabilityArgs} returns this
 */
proto.api_container_api.WaitForEndpointAvailabilityArgs.prototype.setRetries = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional uint32 retries_delay_milliseconds = 6;
 * @return {number}
 */
proto.api_container_api.WaitForEndpointAvailabilityArgs.prototype.getRetriesDelayMilliseconds = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.api_container_api.WaitForEndpointAvailabilityArgs} returns this
 */
proto.api_container_api.WaitForEndpointAvailabilityArgs.prototype.setRetriesDelayMilliseconds = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional string body_text = 7;
 * @return {string}
 */
proto.api_container_api.WaitForEndpointAvailabilityArgs.prototype.getBodyText = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.api_container_api.WaitForEndpointAvailabilityArgs} returns this
 */
proto.api_container_api.WaitForEndpointAvailabilityArgs.prototype.setBodyText = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};


