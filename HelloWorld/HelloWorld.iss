#define MyAppName "HelloWorld"
#define MyAppVersion "1.0"
#define MyAppPublisher "My Company, Inc."
#define MyAppURL "https://www.helloworld.com/"
#define MyAppExeName "HelloWorld.exe"

[Setup]
AppId={{AE321057-FFF1-4E68-AF07-873CED008F64}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
DefaultDirName={autopf}\{#MyAppName}
OutputDir=C:\Users\ckerv\Downloads
OutputBaseFilename=HelloWorldInstallateur
Compression=lzma2
SolidCompression=yes
WizardStyle=modern

[Files]
Source: "C:\Users\ckerv\Documents\GitHub\untitled1\cmake-build-debug\HelloWorld.exe"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}";

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#MyAppName}}"; Flags: nowait postinstall skipifsilent

[Code]


procedure InitializeWizard;
var
  Page: TWizardPage;
  LabelHello: TLabel;
begin
  Page := CreateCustomPage(wpWelcome, 'Bienvenu HELLO WORLD','Hello Wooorld');
  
  LabelHello := TLabel.Create(WizardForm);
  LabelHello.Parent := Page.Surface;
  LabelHello.Left := 20;
  LabelHello.Top := 80;
  LabelHello.Caption := 'HELLO WORLD';
  LabelHello.Font.Name := 'Arial';
  LabelHello.Font.Size := 24;
  LabelHello.Font.Style := [fsBold];
  LabelHello.Font.Color := clBlack;

end;
