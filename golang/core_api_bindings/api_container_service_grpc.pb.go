// Code generated by protoc-gen-go-grpc. DO NOT EDIT.

package core_api_bindings

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// ApiContainerServiceClient is the client API for ApiContainerService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type ApiContainerServiceClient interface {
	// Registers a service with the API container but doesn't start the container for it
	RegisterService(ctx context.Context, in *RegisterServiceArgs, opts ...grpc.CallOption) (*RegisterServiceResponse, error)
	// Generates files inside the test volume on the filesystem for a container
	GenerateFiles(ctx context.Context, in *GenerateFilesArgs, opts ...grpc.CallOption) (*GenerateFilesResponse, error)
	// Starts a previously-registered service by creating a Docker container for it
	StartService(ctx context.Context, in *StartServiceArgs, opts ...grpc.CallOption) (*StartServiceResponse, error)
	// Instructs the API container to remove the given service
	RemoveService(ctx context.Context, in *RemoveServiceArgs, opts ...grpc.CallOption) (*emptypb.Empty, error)
	// Instructs the API container to repartition the test network
	Repartition(ctx context.Context, in *RepartitionArgs, opts ...grpc.CallOption) (*emptypb.Empty, error)
	// Executes the given command inside a running container
	ExecCommand(ctx context.Context, in *ExecCommandArgs, opts ...grpc.CallOption) (*ExecCommandResponse, error)
	// Executes multiple commands at once
	ExecuteBulkCommands(ctx context.Context, in *ExecuteBulkCommandsArgs, opts ...grpc.CallOption) (*emptypb.Empty, error)
}

type apiContainerServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewApiContainerServiceClient(cc grpc.ClientConnInterface) ApiContainerServiceClient {
	return &apiContainerServiceClient{cc}
}

func (c *apiContainerServiceClient) RegisterService(ctx context.Context, in *RegisterServiceArgs, opts ...grpc.CallOption) (*RegisterServiceResponse, error) {
	out := new(RegisterServiceResponse)
	err := c.cc.Invoke(ctx, "/api_container_api.ApiContainerService/RegisterService", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *apiContainerServiceClient) GenerateFiles(ctx context.Context, in *GenerateFilesArgs, opts ...grpc.CallOption) (*GenerateFilesResponse, error) {
	out := new(GenerateFilesResponse)
	err := c.cc.Invoke(ctx, "/api_container_api.ApiContainerService/GenerateFiles", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *apiContainerServiceClient) StartService(ctx context.Context, in *StartServiceArgs, opts ...grpc.CallOption) (*StartServiceResponse, error) {
	out := new(StartServiceResponse)
	err := c.cc.Invoke(ctx, "/api_container_api.ApiContainerService/StartService", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *apiContainerServiceClient) RemoveService(ctx context.Context, in *RemoveServiceArgs, opts ...grpc.CallOption) (*emptypb.Empty, error) {
	out := new(emptypb.Empty)
	err := c.cc.Invoke(ctx, "/api_container_api.ApiContainerService/RemoveService", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *apiContainerServiceClient) Repartition(ctx context.Context, in *RepartitionArgs, opts ...grpc.CallOption) (*emptypb.Empty, error) {
	out := new(emptypb.Empty)
	err := c.cc.Invoke(ctx, "/api_container_api.ApiContainerService/Repartition", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *apiContainerServiceClient) ExecCommand(ctx context.Context, in *ExecCommandArgs, opts ...grpc.CallOption) (*ExecCommandResponse, error) {
	out := new(ExecCommandResponse)
	err := c.cc.Invoke(ctx, "/api_container_api.ApiContainerService/ExecCommand", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *apiContainerServiceClient) ExecuteBulkCommands(ctx context.Context, in *ExecuteBulkCommandsArgs, opts ...grpc.CallOption) (*emptypb.Empty, error) {
	out := new(emptypb.Empty)
	err := c.cc.Invoke(ctx, "/api_container_api.ApiContainerService/ExecuteBulkCommands", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// ApiContainerServiceServer is the server API for ApiContainerService service.
// All implementations must embed UnimplementedApiContainerServiceServer
// for forward compatibility
type ApiContainerServiceServer interface {
	// Registers a service with the API container but doesn't start the container for it
	RegisterService(context.Context, *RegisterServiceArgs) (*RegisterServiceResponse, error)
	// Generates files inside the test volume on the filesystem for a container
	GenerateFiles(context.Context, *GenerateFilesArgs) (*GenerateFilesResponse, error)
	// Starts a previously-registered service by creating a Docker container for it
	StartService(context.Context, *StartServiceArgs) (*StartServiceResponse, error)
	// Instructs the API container to remove the given service
	RemoveService(context.Context, *RemoveServiceArgs) (*emptypb.Empty, error)
	// Instructs the API container to repartition the test network
	Repartition(context.Context, *RepartitionArgs) (*emptypb.Empty, error)
	// Executes the given command inside a running container
	ExecCommand(context.Context, *ExecCommandArgs) (*ExecCommandResponse, error)
	// Executes multiple commands at once
	ExecuteBulkCommands(context.Context, *ExecuteBulkCommandsArgs) (*emptypb.Empty, error)
	mustEmbedUnimplementedApiContainerServiceServer()
}

// UnimplementedApiContainerServiceServer must be embedded to have forward compatible implementations.
type UnimplementedApiContainerServiceServer struct {
}

func (UnimplementedApiContainerServiceServer) RegisterService(context.Context, *RegisterServiceArgs) (*RegisterServiceResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method RegisterService not implemented")
}
func (UnimplementedApiContainerServiceServer) GenerateFiles(context.Context, *GenerateFilesArgs) (*GenerateFilesResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GenerateFiles not implemented")
}
func (UnimplementedApiContainerServiceServer) StartService(context.Context, *StartServiceArgs) (*StartServiceResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method StartService not implemented")
}
func (UnimplementedApiContainerServiceServer) RemoveService(context.Context, *RemoveServiceArgs) (*emptypb.Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method RemoveService not implemented")
}
func (UnimplementedApiContainerServiceServer) Repartition(context.Context, *RepartitionArgs) (*emptypb.Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Repartition not implemented")
}
func (UnimplementedApiContainerServiceServer) ExecCommand(context.Context, *ExecCommandArgs) (*ExecCommandResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method ExecCommand not implemented")
}
func (UnimplementedApiContainerServiceServer) ExecuteBulkCommands(context.Context, *ExecuteBulkCommandsArgs) (*emptypb.Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method ExecuteBulkCommands not implemented")
}
func (UnimplementedApiContainerServiceServer) mustEmbedUnimplementedApiContainerServiceServer() {}

// UnsafeApiContainerServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to ApiContainerServiceServer will
// result in compilation errors.
type UnsafeApiContainerServiceServer interface {
	mustEmbedUnimplementedApiContainerServiceServer()
}

func RegisterApiContainerServiceServer(s grpc.ServiceRegistrar, srv ApiContainerServiceServer) {
	s.RegisterService(&ApiContainerService_ServiceDesc, srv)
}

func _ApiContainerService_RegisterService_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(RegisterServiceArgs)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ApiContainerServiceServer).RegisterService(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/api_container_api.ApiContainerService/RegisterService",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ApiContainerServiceServer).RegisterService(ctx, req.(*RegisterServiceArgs))
	}
	return interceptor(ctx, in, info, handler)
}

func _ApiContainerService_GenerateFiles_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GenerateFilesArgs)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ApiContainerServiceServer).GenerateFiles(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/api_container_api.ApiContainerService/GenerateFiles",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ApiContainerServiceServer).GenerateFiles(ctx, req.(*GenerateFilesArgs))
	}
	return interceptor(ctx, in, info, handler)
}

func _ApiContainerService_StartService_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(StartServiceArgs)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ApiContainerServiceServer).StartService(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/api_container_api.ApiContainerService/StartService",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ApiContainerServiceServer).StartService(ctx, req.(*StartServiceArgs))
	}
	return interceptor(ctx, in, info, handler)
}

func _ApiContainerService_RemoveService_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(RemoveServiceArgs)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ApiContainerServiceServer).RemoveService(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/api_container_api.ApiContainerService/RemoveService",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ApiContainerServiceServer).RemoveService(ctx, req.(*RemoveServiceArgs))
	}
	return interceptor(ctx, in, info, handler)
}

func _ApiContainerService_Repartition_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(RepartitionArgs)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ApiContainerServiceServer).Repartition(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/api_container_api.ApiContainerService/Repartition",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ApiContainerServiceServer).Repartition(ctx, req.(*RepartitionArgs))
	}
	return interceptor(ctx, in, info, handler)
}

func _ApiContainerService_ExecCommand_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ExecCommandArgs)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ApiContainerServiceServer).ExecCommand(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/api_container_api.ApiContainerService/ExecCommand",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ApiContainerServiceServer).ExecCommand(ctx, req.(*ExecCommandArgs))
	}
	return interceptor(ctx, in, info, handler)
}

func _ApiContainerService_ExecuteBulkCommands_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ExecuteBulkCommandsArgs)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ApiContainerServiceServer).ExecuteBulkCommands(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/api_container_api.ApiContainerService/ExecuteBulkCommands",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ApiContainerServiceServer).ExecuteBulkCommands(ctx, req.(*ExecuteBulkCommandsArgs))
	}
	return interceptor(ctx, in, info, handler)
}

// ApiContainerService_ServiceDesc is the grpc.ServiceDesc for ApiContainerService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var ApiContainerService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "api_container_api.ApiContainerService",
	HandlerType: (*ApiContainerServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "RegisterService",
			Handler:    _ApiContainerService_RegisterService_Handler,
		},
		{
			MethodName: "GenerateFiles",
			Handler:    _ApiContainerService_GenerateFiles_Handler,
		},
		{
			MethodName: "StartService",
			Handler:    _ApiContainerService_StartService_Handler,
		},
		{
			MethodName: "RemoveService",
			Handler:    _ApiContainerService_RemoveService_Handler,
		},
		{
			MethodName: "Repartition",
			Handler:    _ApiContainerService_Repartition_Handler,
		},
		{
			MethodName: "ExecCommand",
			Handler:    _ApiContainerService_ExecCommand_Handler,
		},
		{
			MethodName: "ExecuteBulkCommands",
			Handler:    _ApiContainerService_ExecuteBulkCommands_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "api_container_service.proto",
}
