var UndoRedoStack = (function () {
    function UndoRedoStack(initialState) {
        this._stack = [];
        this._cursor = 0;
        this._canUndo = false;
        this._canRedo = false;
        if (initialState) {
            this.addState(initialState);
        }
    }
    Object.defineProperty(UndoRedoStack.prototype, "canUndo", {
        get: function () {
            return this._canUndo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UndoRedoStack.prototype, "canRedo", {
        get: function () {
            return this._canRedo;
        },
        enumerable: true,
        configurable: true
    });
    UndoRedoStack.prototype.addState = function (data) {
        if (data !== this._stack[this._cursor]) {
            this._stack.splice(this._cursor + 1);
            this._stack.push(data);
            this._cursor = this._stack.length - 1;
            this._updateCanUndoRedo();
        }
    };
    UndoRedoStack.prototype.undo = function () {
        if (!this._canUndo)
            return null;
        var value = this._stack[--this._cursor];
        this._updateCanUndoRedo();
        return value;
    };
    UndoRedoStack.prototype.redo = function () {
        if (!this._canRedo)
            return null;
        var value = this._stack[++this._cursor];
        this._updateCanUndoRedo();
        return value;
    };
    UndoRedoStack.prototype._updateCanUndoRedo = function () {
        this._canUndo = this._cursor > 0;
        this._canRedo = this._stack.length - 1 > this._cursor;
    };
    return UndoRedoStack;
}());
