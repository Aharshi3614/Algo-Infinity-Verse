document.addEventListener('DOMContentLoaded', function() {
  const codeInput = document.getElementById('codeInput');
  const output = document.getElementById('output');
  const runBtn = document.getElementById('runBtn');
  const clearBtn = document.getElementById('clearBtn');
  const exampleBtn = document.getElementById('exampleBtn');
  const status = document.getElementById('status');

  const examples = {
    basic: `# Basic Julia
println("Hello, World!")
x = 10
y = 20
println("Sum: ", x + y)`,

    function: `# Function example
function greet(name)
    println("Hello, \$name!")
end
greet("Julia")`,

    math: `# Math operations
a = [1, 2, 3, 4, 5]
println("Sum: ", sum(a))
println("Squares: ", a .^ 2)`
  };

  exampleBtn.addEventListener('click', function() {
    const keys = Object.keys(examples);
    const random = keys[Math.floor(Math.random() * keys.length)];
    codeInput.value = examples[random];
  });

  clearBtn.addEventListener('click', function() {
    codeInput.value = '';
    output.textContent = '';
  });

  runBtn.addEventListener('click', function() {
    const code = codeInput.value.trim();
    if (!code) {
      output.textContent = '⚠️ Please enter some code';
      return;
    }

    status.textContent = '⏳ Running...';
    output.textContent = '';

    setTimeout(() => {
      let result = '📤 Output:\n\n';
      const lines = code.split('\n');
      
      lines.forEach(line => {
        if (line.trim().startsWith('#')) {
          result += line + '\n';
        } else if (line.trim().includes('println')) {
          const match = line.match(/println\("(.+)"\)/);
          if (match) result += match[1] + '\n';
        } else if (line.trim()) {
          result += '> ' + line + '\n';
        }
      });
      
      result += '\n✅ Execution complete';
      output.textContent = result;
      status.textContent = '✅ Done';
    }, 500);
  });

  codeInput.value = examples.basic;
});