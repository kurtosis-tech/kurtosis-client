/*
 *    Copyright 2021 Kurtosis Technologies Inc.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *
 */

package v0_bulk_command_api

import "github.com/palantir/stacktrace"

// We provide a visitor interface here so that:
//  1) all enum cases can be exhaustively handled
//  2) any changes in the enum will result in a compile break
type V0CommandTypeVisitor interface {
	VisitLoadLambda() error
	VisitExecuteLambda() error
	VisitRegisterService() error
	VisitGenerateFiles() error
	VisitLoadStaticFiles() error
	VisitStartService() error
	VisitRemoveService() error
	VisitRepartition() error
	VisitExecCommand() error
	VisitWaitForEndpointAvailabilityHttpGet() error
	VisitWaitForEndpointAvailabilityHttpPost() error
	VisitExecuteBulkCommands() error
}

type V0CommandType string

const (
	// vvvvvvvvvvvvvvvvvvvv Update the visitor whenever you add an enum value!!! vvvvvvvvvvvvvvvvvvvvvvvvvvv
	LoadLambdaCommandType                          V0CommandType = "LOAD_LAMBDA"
	ExecuteLambdaCommandType                       V0CommandType = "EXECUTE_LAMBDA"
	RegisterServiceCommandType                     V0CommandType = "REGISTER_SERVICE"
	GenerateFilesCommandType                       V0CommandType = "GENERATE_FILES"
	LoadStaticFilesCommandType                     V0CommandType = "LOAD_STATIC_FILES"
	StartServiceCommandType                        V0CommandType = "START_SERVICE"
	RemoveServiceCommandType                       V0CommandType = "REMOVE_SERVICE"
	RepartitionCommandType                         V0CommandType = "REPARTITION"
	ExecCommandCommandType                         V0CommandType = "EXEC_COMMAND"
	WaitForEndpointAvailabilityHttpGetCommandType  V0CommandType = "WAIT_FOR_ENDPOINT_AVAILABILITY_HTTP_GET"
	WaitForEndpointAvailabilityHttpPostCommandType V0CommandType = "WAIT_FOR_ENDPOINT_AVAILABILITY_HTTP_POST"
	ExecuteBulkCommandsCommandType                 V0CommandType = "EXECUTE_BULK_COMMANDS"
	// ^^^^^^^^^^^^^^^^^^^^ Update the visitor whenever you add an enum value!!! ^^^^^^^^^^^^^^^^^^^^^^^^^^^
)

func (commandType V0CommandType) AcceptVisitor(visitor V0CommandTypeVisitor) error {
	var err error
	switch commandType {
	case LoadLambdaCommandType:
		err = visitor.VisitLoadLambda()
	case ExecuteLambdaCommandType:
		err = visitor.VisitExecuteLambda()
	case RegisterServiceCommandType:
		err = visitor.VisitRegisterService()
	case GenerateFilesCommandType:
		err = visitor.VisitGenerateFiles()
	case LoadStaticFilesCommandType:
		err = visitor.VisitLoadStaticFiles()
	case StartServiceCommandType:
		err = visitor.VisitStartService()
	case RemoveServiceCommandType:
		err = visitor.VisitRemoveService()
	case RepartitionCommandType:
		err = visitor.VisitRepartition()
	case ExecCommandCommandType:
		err = visitor.VisitExecCommand()
	case WaitForEndpointAvailabilityHttpGetCommandType:
		err = visitor.VisitWaitForEndpointAvailabilityHttpGet()
	case WaitForEndpointAvailabilityHttpPostCommandType:
		err = visitor.VisitWaitForEndpointAvailabilityHttpPost()
	case ExecuteBulkCommandsCommandType:
		err = visitor.VisitExecuteBulkCommands()
	default:
		return stacktrace.NewError("Unrecognized command type '%v'", commandType)
	}
	if err != nil {
		return stacktrace.Propagate(err, "The visitor returned an error for command type '%v'", commandType)
	}
	return nil
}
