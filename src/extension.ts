import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "notification" is now active!');
  var initialTime = new Date().getTime();
  let disposable = vscode.workspace.onDidSaveTextDocument((e) => {
    var currentTime = new Date().getTime();
    var timeDiff = currentTime - initialTime;
    initialTime = currentTime;
    var formatedTime;
    if (timeDiff >= 1000 && timeDiff < 60000) {
      formatedTime = (timeDiff / 1000).toFixed(2) + " seconds";
    } else if (timeDiff >= 60000 && timeDiff < 3600000) {
      formatedTime = (timeDiff / 60000).toFixed(2) + "minutes";
    } else if (timeDiff >= 3600000) {
      formatedTime = (timeDiff / 3600000).toFixed(2) + "hours";
    } else {
      formatedTime = timeDiff + " milliseconds";
    }

    vscode.window
      .showInformationMessage(
        `Saved ${e.fileName} after ${formatedTime}`,
        "Ok",
        "Close"
      )
      .then((selection) => {
        if (selection === "Ok") {
          vscode.commands.executeCommand("workbench.action.closeMessages");
        } else if (selection === "Close") {
          vscode.commands.executeCommand("workbench.action.closeWindow");
        }
      });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
