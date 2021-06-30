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

goog.provide('proto.api_container_api.RepartitionArgs');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Map');
goog.require('jspb.Message');
goog.require('proto.api_container_api.PartitionConnectionInfo');
goog.require('proto.api_container_api.PartitionConnections');
goog.require('proto.api_container_api.PartitionServices');

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
proto.api_container_api.RepartitionArgs = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.api_container_api.RepartitionArgs, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.api_container_api.RepartitionArgs.displayName = 'proto.api_container_api.RepartitionArgs';
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
proto.api_container_api.RepartitionArgs.prototype.toObject = function(opt_includeInstance) {
  return proto.api_container_api.RepartitionArgs.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.api_container_api.RepartitionArgs} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api_container_api.RepartitionArgs.toObject = function(includeInstance, msg) {
  var f, obj = {
    partitionServicesMap: (f = msg.getPartitionServicesMap()) ? f.toObject(includeInstance, proto.api_container_api.PartitionServices.toObject) : [],
    partitionConnectionsMap: (f = msg.getPartitionConnectionsMap()) ? f.toObject(includeInstance, proto.api_container_api.PartitionConnections.toObject) : [],
    defaultConnection: (f = msg.getDefaultConnection()) && proto.api_container_api.PartitionConnectionInfo.toObject(includeInstance, f)
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
 * @return {!proto.api_container_api.RepartitionArgs}
 */
proto.api_container_api.RepartitionArgs.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.api_container_api.RepartitionArgs;
  return proto.api_container_api.RepartitionArgs.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.api_container_api.RepartitionArgs} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.api_container_api.RepartitionArgs}
 */
proto.api_container_api.RepartitionArgs.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = msg.getPartitionServicesMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.api_container_api.PartitionServices.deserializeBinaryFromReader, "", new proto.api_container_api.PartitionServices());
         });
      break;
    case 2:
      var value = msg.getPartitionConnectionsMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.api_container_api.PartitionConnections.deserializeBinaryFromReader, "", new proto.api_container_api.PartitionConnections());
         });
      break;
    case 3:
      var value = new proto.api_container_api.PartitionConnectionInfo;
      reader.readMessage(value,proto.api_container_api.PartitionConnectionInfo.deserializeBinaryFromReader);
      msg.setDefaultConnection(value);
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
proto.api_container_api.RepartitionArgs.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.api_container_api.RepartitionArgs.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.api_container_api.RepartitionArgs} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.api_container_api.RepartitionArgs.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPartitionServicesMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(1, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.api_container_api.PartitionServices.serializeBinaryToWriter);
  }
  f = message.getPartitionConnectionsMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(2, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.api_container_api.PartitionConnections.serializeBinaryToWriter);
  }
  f = message.getDefaultConnection();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.api_container_api.PartitionConnectionInfo.serializeBinaryToWriter
    );
  }
};


/**
 * map<string, PartitionServices> partition_services = 1;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!proto.api_container_api.PartitionServices>}
 */
proto.api_container_api.RepartitionArgs.prototype.getPartitionServicesMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!proto.api_container_api.PartitionServices>} */ (
      jspb.Message.getMapField(this, 1, opt_noLazyCreate,
      proto.api_container_api.PartitionServices));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.api_container_api.RepartitionArgs} returns this
 */
proto.api_container_api.RepartitionArgs.prototype.clearPartitionServicesMap = function() {
  this.getPartitionServicesMap().clear();
  return this;};


/**
 * map<string, PartitionConnections> partition_connections = 2;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!proto.api_container_api.PartitionConnections>}
 */
proto.api_container_api.RepartitionArgs.prototype.getPartitionConnectionsMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!proto.api_container_api.PartitionConnections>} */ (
      jspb.Message.getMapField(this, 2, opt_noLazyCreate,
      proto.api_container_api.PartitionConnections));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.api_container_api.RepartitionArgs} returns this
 */
proto.api_container_api.RepartitionArgs.prototype.clearPartitionConnectionsMap = function() {
  this.getPartitionConnectionsMap().clear();
  return this;};


/**
 * optional PartitionConnectionInfo default_connection = 3;
 * @return {?proto.api_container_api.PartitionConnectionInfo}
 */
proto.api_container_api.RepartitionArgs.prototype.getDefaultConnection = function() {
  return /** @type{?proto.api_container_api.PartitionConnectionInfo} */ (
    jspb.Message.getWrapperField(this, proto.api_container_api.PartitionConnectionInfo, 3));
};


/**
 * @param {?proto.api_container_api.PartitionConnectionInfo|undefined} value
 * @return {!proto.api_container_api.RepartitionArgs} returns this
*/
proto.api_container_api.RepartitionArgs.prototype.setDefaultConnection = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.api_container_api.RepartitionArgs} returns this
 */
proto.api_container_api.RepartitionArgs.prototype.clearDefaultConnection = function() {
  return this.setDefaultConnection(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.api_container_api.RepartitionArgs.prototype.hasDefaultConnection = function() {
  return jspb.Message.getField(this, 3) != null;
};


