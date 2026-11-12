import subprocess
import time
import shutil
import sys
import os

ADB = "/mnt/c/Users/Zendrix/AppData/Local/Android/Sdk/platform-tools/adb.exe"
WIN_DEST = r"C:\Users\Zendrix\Desktop\playIT\playit_rec.mp4"
LINUX_DEST = "public/videos/playit_raw.mp4"

def run_adb(args, timeout=30):
    cmd = [ADB] + args
    return subprocess.run(cmd, stdin=subprocess.DEVNULL, capture_output=True, text=True, timeout=timeout)

def main():
    print("Verifying emulator connection...")
    p = run_adb(["devices"])
    if "emulator-5554\tdevice" not in p.stdout:
        print("Emulator not ready:", p.stdout)
        sys.exit(1)
    print("Emulator is online and connected.")

    # Remove any old recording on device
    run_adb(["shell", "rm", "-f", "/sdcard/playit_rec.mp4"])

    # Reset PlayIT to Map
    print("Launching PlayIT to ensure map is active...")
    run_adb(["shell", "am", "start", "-n", "com.playit.app/.MainActivity"])
    time.sleep(2)

    # If currently in a subscreen, press BACK to return to Map
    run_adb(["shell", "input", "keyevent", "4"])
    time.sleep(1)
    run_adb(["shell", "input", "keyevent", "4"])
    time.sleep(1)

    print("Starting background screenrecord for 14 seconds...")
    rec_proc = subprocess.Popen(
        [ADB, "shell", "screenrecord", "--size", "720x1600", "--bit-rate", "6000000", "--time-limit", "14", "/sdcard/playit_rec.mp4"],
        stdin=subprocess.DEVNULL
    )

    print("Phase 1: Presenting Bohol Chocolate Hills Map (2.5s)...")
    time.sleep(2.5)

    print("Phase 2: Tapping Level Node 'M' at (168, 2050)...")
    run_adb(["shell", "input", "tap", "168", "2050"])
    time.sleep(3.0)

    print("Phase 3: Hear It screen active. Tapping Next at (540, 2100)...")
    run_adb(["shell", "input", "tap", "540", "2100"])
    time.sleep(2.5)

    print("Phase 4: Say It screen active. Tapping Mic at (540, 1750)...")
    run_adb(["shell", "input", "tap", "540", "1750"])
    time.sleep(2.5)

    print("Phase 5: Pronunciation recognized. Tapping Next at (540, 2100)...")
    run_adb(["shell", "input", "tap", "540", "2100"])
    time.sleep(2.0)

    print("Waiting for screen recording to complete...")
    rec_proc.wait(timeout=15)
    time.sleep(1)

    print("Pulling recorded MP4 from emulator...")
    p_pull = run_adb(["pull", "/sdcard/playit_rec.mp4", WIN_DEST], timeout=25)
    print("Pull output:", p_pull.stdout, p_pull.stderr)

    if os.path.exists("/mnt/c/Users/Zendrix/Desktop/playIT/playit_rec.mp4"):
        shutil.copyfile("/mnt/c/Users/Zendrix/Desktop/playIT/playit_rec.mp4", LINUX_DEST)
        size = os.path.getsize(LINUX_DEST)
        print(f"SUCCESS! Recorded video saved to {LINUX_DEST} ({size} bytes).")
    else:
        print("ERROR: Pulled file not found on disk!")
        sys.exit(1)

if __name__ == "__main__":
    main()
