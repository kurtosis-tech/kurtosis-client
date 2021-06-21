package bulk_command_execution

type CommandType string

const (
	RegisterServiceCommandType CommandType = "REGISTER_SERVICE"
	StartServiceCommandType = "START_SERVICE"
)

type SerializableCommand struct {
	Type CommandType	`json:"type"`

	// The only allowed objects here are from the bindings generated from the .proto file
	Args interface{}	`json:"args"`
}

type V1BulkExecutionInstructions struct {
	Commands []SerializableCommand `json:"commands"`
}
