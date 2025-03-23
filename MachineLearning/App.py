import subprocess
import os
import time

base_dir = os.path.dirname(os.path.abspath(__file__))


def run_script(script_name):
    script_path = os.path.join(base_dir, script_name)
    try:
        process = subprocess.Popen(["python", script_path])
        return process
    except Exception as e:
        print(f"❌ Error starting {script_name}: {e}")
        return None


if __name__ == "__main__":
    print("🚀 Starting serial_to_server.py...")
    serial_process = run_script("serial_to_server.py")

    time.sleep(5)

    print("📡 Starting predict.py...")
    predict_process = run_script("predict.py")

    try:
        while True:
            time.sleep(10)
    except KeyboardInterrupt:
        print("🛑 Stopping both processes...")
        if serial_process:
            serial_process.terminate()
        if predict_process:
            predict_process.terminate()
