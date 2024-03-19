<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TodoController extends Controller
{
    public function index() {

        $todos = Todo::all();

        $data = [
            'status' => 200,
            'todos' => $todos,
        ];

        if ($todos->count() > 0) {
            return response()->json($data, 200);
        } else {
            return response()->json(['status' => 404,
            'message'=> "No records found",
        ], 404 );
        }
    }

    public function store(Request $request) {

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:150',
            'description' => 'nullable|string|max:200',
            'completed' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'=> 422,
                'errors' => $validator->messages()
            ], 422);
        } else {
            $todo = Todo::create([
                'title' => $request->title,
                'description'=> $request->description,
                'completed'=> $request->completed,
            ]);

            if ($todo) {
                return response()->json([
                    'status' => 200,
                    'message' => 'Todo created successfully',
                ], 200);

            } else {
                return response()->json([
                    'status' => 500,
                    'message' => 'Something went wrong',
                ], 500);
            }
        }
    }

    public function show($id) {

        $todo = Todo::find($id);
        if ($todo) {
            return response()->json([
                'status' => 200,
                'message' => $todo
            ], 200);

        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no task found'
            ], 404);
        }
    }

    public function edit($id) {

        $todo = Todo::find($id);
        if ($todo) {
            return response()->json([
                'status' => 200,
                'message' => $todo
            ], 200);

        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no task found'
            ], 404);
        }
    }

    public function update(Request $request, int $id) {

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:150',
            'description' => 'nullable|string|max:200',
            'completed' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'=> 422,
                'errors' => $validator->messages()
            ], 422);
        } else {

            $todo = Todo::find($id);

            if ($todo) {

                $todo->update([
                    'title' => $request->title,
                    'description'=> $request->description,
                    'completed'=> $request->completed,
                ]);

                return response()->json([
                    'status' => 200,
                    'message' => 'Todo updated successfully',
                ], 200);

            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Todo not found',
                ], 404);
            }
        }
    }

    public function destroy($id) {

        $todo = Todo::find($id);

        if ($todo) {
            $todo->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Todo deleted successfully',
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Todo not found',
            ], 404);
        }
    }



}
