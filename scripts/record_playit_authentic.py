import subprocess
import time
import shutil
import sys
import os

ADB = "/mnt/c/Users/Zendrix/AppData/Local/Android/Sdk/platform-tools/adb.exe"
WIN_DEST = r"C:\Users\Zendrix\Desktop\playIT\playit_live_session.mp4"
LINUX_DEST = "public/videos/playit_live_session.mp4"

def run_adb(args, timeout=30):
    cmd = [ADB] + args
    return subprocess.run(cmd, stdin=subprocess.DEVNULL, capture_output=True, text=True, timeout=timeout)

def main():
    print("1. Preparing PlayIT database state...")
    sql = """
    CREATE TABLE IF NOT EXISTS lesson_progress (phonemeId TEXT PRIMARY KEY NOT NULL, isCompleted INTEGER NOT NULL, starsEarned INTEGER NOT NULL);
    INSERT OR REPLACE INTO lesson_progress VALUES ("m", 1, 3);
    UPDATE app_config SET currentStreak = 3 WHERE id = 1;
    """
    run_adb(["shell", "run-as", "com.playit.app", "sqlite3", "databases/playit_database", f"\"{sql}\""])

    print("2. Starting PlayIT fresh on Map screen...")
    run_adb(["shell", "am", "force-stop", "com.playit.app"])
    time.sleep(1)
    run_adb(["shell", "am", "start", "-n", "com.playit.app/.MainActivity"])
    time.sleep(3)

    # Clean old recording file
    run_adb(["shell", "rm", "-f", "/sdcard/playit_live_session.mp4"])

    print("3. Launching screenrecord for 12 seconds...")
    rec_proc = subprocess.Popen(
        [ADB, "shell", "screenrecord", "--verbose", "--size", "720x1600", "--bit-rate", "6000000", "--time-limit", "12", "/sdcard/playit_live_session.mp4"],
        stdin=subprocess.DEVNULL,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )

    time.sleep(0.5)

    print("--- Beat 1 (0.5s - 3.0s): Bohol Map exploration ---")
    # Smooth scroll up and down
    run_adb(["shell", "input", "swipe", "540", "1500", "540", "1100", "350"])
    time.sleep(0.8)
    run_adb(["shell", "input", "swipe", "540", "1100", "540", "1500", "350"])
    time.sleep(1.0)

    print("--- Beat 2 (3.0s - 6.0s): Opening Level Node M (Hear It) ---")
    run_adb(["shell", "input", "tap", "540", "1200"])
    time.sleep(1.2)
    # Tap replay audio on HearIt screen
    run_adb(["shell", "input", "tap", "540", "1750"])
    time.sleep(1.5)

    print("--- Beat 3 (6.0s - 9.0s): Next to Say It & Pronounce ---")
    run_adb(["shell", "input", "tap", "540", "2100"])
    time.sleep(1.2)
    # Tap Mic button
    run_adb(["shell", "input", "tap", "540", "1750"])
    time.sleep(1.5)

    print("--- Beat 4 (9.0s - 12.0s): Next to Find It & Match ---")
    run_adb(["shell", "input", "tap", "540", "2100"])
    time.sleep(1.2)
    # Tap matching tile on FindIt screen
    run_adb(["shell", "input", "tap", "540", "1300"])
    time.sleep(1.5)

    print("Waiting for screen recording process to finalize...")
    stdout, stderr = rec_proc.communicate(timeout=10)
    print("Screenrecord log:\n", stdout.decode())

    time.sleep(1)
    print("Pulling video from emulator...")
    run_adb(["pull", "/sdcard/playit_live_session.mp4", WIN_DEST], timeout=25)

    if os.path.exists("/mnt/c/Users/Zendrix/Desktop/playIT/playit_live_session.mp4"):
        shutil.copyfile("/mnt/c/Users/Zendrix/Desktop/playIT/playit_live_session.mp4", LINUX_DEST)
        size = os.path.getsize(LINUX_DEST)
        print(f"SUCCESS! Authentic emulator video saved to {LINUX_DEST} ({size} bytes).")
    else:
        print("ERROR: Pulled file not found!")
        sys.exit(1)

if __name__ == "__main__":
    main()
