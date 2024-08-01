<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import { getContext, setContext } from 'svelte';

    // Set a context key for window count
    const windowCountKey = 0;

    // Get the current window count from context or initialize it
    let windowCount = getContext(windowCountKey) as number || 0;
    setContext(windowCountKey, windowCount + 1);

    export let windowTitle = '';
    export let onClose: () => void;

    let x: number, y: number;
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    let windowWidth: number, windowHeight: number;

    // Function to start dragging
    function startDrag(event) {
        if (event.target.closest('.content')) {
            return;
        }
        isDragging = true;
        offsetX = event.clientX - x;
        offsetY = event.clientY - y;
    }

    // Function to stop dragging
    function stopDrag() {
        isDragging = false;
    }

    // Function to handle dragging
    function drag(event) {
        if (isDragging) {
            x = event.clientX - offsetX;
            y = event.clientY - offsetY;
            enforceBounds();
        }
    }

    // Function to enforce boundary checks
    function enforceBounds() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x > viewportWidth - windowWidth) x = viewportWidth - windowWidth;
        if (y > viewportHeight - windowHeight) y = viewportHeight - windowHeight;
    }

    onMount(() => {
        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Get window element dimensions
        const windowElement = document.querySelector('.window-area');
        windowWidth = windowElement.clientWidth;
        windowHeight = windowElement.clientHeight;

        // Center the window and apply offset
        x = (viewportWidth / 2) - (windowWidth / 2);
        y = (viewportHeight / 2) - (windowHeight / 2) + windowCount * -50;

        // Ensure initial position is within bounds
        enforceBounds();

        // Add event listeners for drag functionality
        window.addEventListener('mousemove', drag);
        window.addEventListener('mouseup', stopDrag);
    });

    onDestroy(() => {
        // Remove event listeners
        window.removeEventListener('mousemove', drag);
        window.removeEventListener('mouseup', stopDrag);
    });
</script>

<div
    role="button"
    tabindex="0"
    class="window-area cursor-move absolute rounded-md border-[1px] border-zinc-600"
    on:mousedown={startDrag}
    style="left: {x}px; top: {y}px;"
>
    <div>
        <div class="header w-full flex items-center justify-between rounded-t-md bg-zinc-900">
            <span class="text-sm text-foreground mx-2 font-extralight">
                {windowTitle}
            </span>
            <button
                class="bg-red-950 text-primary hover:bg-red-800 rounded-tr-md hover:text-neutral-200"
                on:click|preventDefault={() => onClose()}
            >
                <svg
                    class="w-6 h-6 p-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"
                    ></path>
                </svg>
            </button>
        </div>
        <div class="content bg-background bg-opacity-95 cursor-default flex items-center justify-center rounded-b-md border-x-[2px] border-b-[2px] border-black">
            <slot />
        </div>
    </div>
</div>
